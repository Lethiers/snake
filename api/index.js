'use strict'
/*eslint-env node, es6 */
// importation paquet express
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT = 3000;

// crée une application express
const app = express();

app.use(cors())

// routes pour retourner les scores
app.get('/scores', (req,res) => {
    let scores = require('./scores.json')
    delete require.cache[require.resolve('./scores.json')];
    res.status(200).json(scores);
});

// routes pour ajouter un score
app.get('/new/:name/:score', (req,res) => {
    const fs = require('fs');

    const name = req.params.name;
    const score = req.params.score;

    const newPlayer = {
        name: name,
        score: score
    };
    
    // on vient récupérer le fichier
    fs.readFile('./scores.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    
        // convertir les données en objet JSON
        let players = JSON.parse(data);
    
        // Ajouter un nouveau joueur
        players.players.push(newPlayer);
    
        // Conversion des données mises à jour en chaîne JSON
        const jsonData = JSON.stringify(players);
    
        // ajout utilisateur
        fs.writeFile('./scores.json', jsonData, 'utf8', (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Joueur ajouté avec succès");
            }
        });
    });

    res.status(200).json(newPlayer);
})

app.listen(PORT,()=>{
    console.log(`serveur démarer :http://localhost:${PORT}`);
});