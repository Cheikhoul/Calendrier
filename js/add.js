// Define events and requires
const { ipcRenderer } = require('electron')
const mysql = require('mysql2');
const { stat } = require('original-fs');

const valider = document.getElementById('valider')



// Create database connection 
function connection() {
    return connect = mysql.createConnection({
        host: 'localhost', 
        user: 'cheikhoul',
        password: '09121968.',
        database: 'calendrier',
        port: 8889,
    })    
} 

valider.addEventListener('click', () =>{
    let titre = document.getElementById('addTitle')
    let dateDeb = document.getElementById('startdate')
    let dateFin = document.getElementById('enddate')
    let location = document.getElementById('addLieu')
    let categorie = document.getElementById('addCategorie')
    let statut = document.getElementById('addStatut')
    let descr = document.getElementById('addDescription')
    let transparence = document.getElementById('addTransparence')
    console.log(titre, dateDeb, dateFin)
    createEvent(dateDeb.value, dateFin.value, titre.value, location.value, categorie.value, statut.value, descr.value, transparence.value, function(err,result,fields){
        if(err) throw err;
        console.log(result);
        ipcRenderer.invoke("closeAddEvent")
    })
})

function createEvent(dateDeb, dateFin, titre, location, categorie, statut, description, transparence, cb) {
    connection()
    let query = "INSERT INTO event(`date_deb`, `date_fin`, `titre`, `location`, `categorie`, `statut`, `description`, `transparence`, `nbMaj`) VALUES (?,?,?,?,?,?,?,?,1)"
    console.log(connect.query(query, [dateDeb, dateFin, titre, location, categorie, statut, description, transparence], cb))
}

  