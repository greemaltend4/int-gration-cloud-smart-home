const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
app.use(bodyParser.json());

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

app.get('/api/devices', (req, res) => {
  // Logique pour récupérer les appareils
  admin.database().ref('/devices').once('value')
    .then(snapshot => {
      const devices = snapshot.val();
      res.status(200).json(devices);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des appareils');
    });
});

app.listen(3000, () => {
  console.log('Le serveur est à l'écoute sur le port 3000');
});