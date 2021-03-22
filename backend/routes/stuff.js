const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
/*
methode get pour repondre uniquement aux demandes get a cet endpoint
: en face du segment dynamique de la route pour la rendre accessible en tant que parametre
methode findOne dans le modele thing pour trouver le thing unique suivant son id mis en parametre
*/
router.get('/:id', auth, stuffCtrl.getOneThing);

        //URL utilisé par l'application, l'endpoint, la route vers notre API
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;
