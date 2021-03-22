const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://ondina:2712ondi@cluster0.e22lj.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
/*
  ces headers permettent:
    D'acceder a notre API depuis n'importe quelle origine ('*')
    d'ajouter les headers mentionnés aux requetes envoyées vers notre API (Origin, X-Requested-with, etc)
    d'envoyer des requestes avec les methodes mentionnées (GET, POST, etc)
*/
app.use(bodyParser.json());
/* c'est ce qui va transformer le corps de la requete en objet javascript utilisable*/

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
