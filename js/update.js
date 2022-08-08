// declare others variables
const editer = document.getElementById("editValider")
const annuler = document.getElementById("editAnnuler")

const { ipcRenderer } = require('electron')
const mysql = require('mysql2');
const querystring = require('querystring')

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


// declare dbb variables
const titre = document.getElementById('editTitle')
const dateDebut = document.getElementById('editStartdate')
const dateFin = document.getElementById('editEnddate')
const lieu = document.getElementById('editLieu')
const description = document.getElementById('editDescription')
const categorie = document.getElementById('editCategorie')
const statut = document.getElementById('editStatut')
const transparence = document.getElementById('editTransparence')

// set attributes to variables 

let query = querystring.parse(global.location.search);
let data = JSON.parse(query['?data'])
console.log(data["date_deb"])

let creerDateDeb = data["date_deb"].split("-")
let nouvelleDateDeb = new Date(parseInt(creerDateDeb[0]), parseInt(creerDateDeb[1]), parseInt(creerDateDeb[2])+1)
let nouvelleDateDebValue = nouvelleDateDeb.getFullYear()+"-"+jmoins10(nouvelleDateDeb.getMonth())+"-"+jmoins10(nouvelleDateDeb.getDate())

let creerDateFin = data["date_fin"].split("-")
let nouvelleDateFin = new Date(parseInt(creerDateFin[0]), parseInt(creerDateFin[1]), parseInt(creerDateFin[2])+1)
let nouvelleDateFinValue = nouvelleDateFin.getFullYear()+"-"+jmoins10(nouvelleDateFin.getMonth())+"-"+jmoins10(nouvelleDateFin.getDate())

let id = data["id"]
let nbMaj = data["nbMaj"]


titre.setAttribute("value", data["titre"])
dateDebut.setAttribute("value", nouvelleDateDebValue)
dateFin.setAttribute("value", nouvelleDateFin)
lieu.setAttribute("value",data["location"])
description.setAttribute("value", data["description"])
categorie.setAttribute("value", data["categorie"])
statut.setAttribute("value", data["statut"])
transparence.setAttribute("value", data["transparence"])


// start declare events

editer.addEventListener("click", () => {
    console.log(dateDebut.value)
    if(confirm("Voulez-vous vraiment modifier cet événement ?")){
        updateEvt(dateDebut.value, dateFin.value, titre.value, lieu.value, categorie.value, statut.value, description.value, transparence.value, nbMaj, id, function(err, result, fields) {
            if(err) throw err;
            ipcRenderer.invoke("closeEditEvent")
        })
    }
})

function updateEvt(dateDebut, dateFin, titre, lieu, categorie, statut, description, transparence, nbMaj, id, cb) {
    connection();
    nbMaj += 1
    let query = "UPDATE event SET `date_deb` = ?, `date_fin` = ?, `titre` = ?, `location` = ?, `categorie` = ?, `statut` = ?, `description` = ?, `transparence` = ?, `nbMaj` = ? WHERE id = ?"
    connect.query(query, [dateDebut, dateFin, titre, lieu, categorie, statut, description, transparence, nbMaj, id], cb)
}

function jmoins10(jm10) {
    if(jm10 < 10) {
        jm10 = "0" + jm10
    }
    return jm10
}