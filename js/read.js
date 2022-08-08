// Define events and requires
const { ipcRenderer } = require('electron')
const mysql = require('mysql2');

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

const querystring = require('querystring')

const titre = document.getElementById('eventTitle')
const dateDebut = document.getElementById('eventDateDeb')
const dateFin = document.getElementById('eventDateFin')
const lieu = document.getElementById('eventLocation')
const description = document.getElementById('eventDescription')
const categorie = document.getElementById('eventCategorie')
const statut = document.getElementById('eventStatut')
const transparence = document.getElementById('eventTransparence')

let query = querystring.parse(global.location.search);

let data = JSON.parse(query['?data'])
let creerDateDeb = data["date_deb"].split("-")
let nouvelleDateDeb = new Date(parseInt(creerDateDeb[0]), parseInt(creerDateDeb[1])-1, parseInt(creerDateDeb[2])+1)

let creerDateFin = data["date_fin"].split("-")
let nouvelleDateFin = new Date(parseInt(creerDateFin[0]), parseInt(creerDateFin[1])-1, parseInt(creerDateFin[2])+1)


titre.innerText += data["titre"]
dateDebut.innerHTML = nouvelleDateDeb.toString().slice(0,15)
dateFin.innerHTML = nouvelleDateFin.toString().slice(0,15)
lieu.innerHTML += data["location"]
description.innerHTML += data["description"]
categorie.innerHTML += data["categorie"]
statut.innerHTML += data["statut"]
transparence.innerHTML += data["transparence"]

const modifier = document.getElementById('viewModifier')
const supprimer = document.getElementById('viewSupprimer')

supprimer.addEventListener("click", () => {
    if(confirm("Voulez-vous réellement supprimer cet événement ?")){
        deleteEvt(data["id"], function(err, result, fields) {
            if(err) throw err;
            ipcRenderer.invoke("closeViewEvent")
        })
    }
})

modifier.addEventListener("click", () => {
    ipcRenderer.invoke("editViewEvent", data)
})

function deleteEvt(id, cb) {
    connection()
    let query ="DELETE FROM event WHERE id=?"
    connect.query(query, [id], cb)
}