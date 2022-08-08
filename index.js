const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

let mainWin = null;
let winAdd = null;
let viewWindow = null;

//functions to open all windows 
function createWindow() {
    // Create the browser window.
    mainWin = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    mainWin.loadFile('index.html')
}
function openBrowserWindow() {
    winAdd = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    winAdd.loadFile('./add.html');

}
function openViewWindow(params) {
    viewWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWin,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'load.js')
        }
    })
    viewWindow.loadFile('./view.html', {query: {"data": JSON.stringify(params)}})
}
function openEditWindow(params) {
    const editWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: viewWindow,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'load.js')
        }
    })
    editWindow.loadFile('./edit.html', {query: {"data": JSON.stringify(params)}})
}

// promise to open the full app
app.whenReady().then(() => {
    createWindow()
})

// ipcMain open 
ipcMain.handle("addBrowserWindow", (evt, params) =>{
    openBrowserWindow()
})
ipcMain.handle("viewEvent", (evt, params) => {
    openViewWindow(params)
})
ipcMain.handle("editViewEvent", (evt, params) => {
    openEditWindow(params)
})

//ipcMain close 
ipcMain.handle("closeAddEvent", (evt, params) => {
    BrowserWindow.fromWebContents(evt.sender).close()
    mainWin.reload()
})
ipcMain.handle("closeViewEvent", (evt, params) => {
    BrowserWindow.fromBrowserView(evt.sender).close()
    mainWin.reload()
})
ipcMain.handle("closeEditEvent", (evt, params) => {
    BrowserWindow.fromBrowserView(evt.sender).close()
    mainWin.reload()
})
ipcMain.handle("undoEditEvent", (evt, params) => {
    BrowserWindow.fromBrowserView(evt.sender).close()
})