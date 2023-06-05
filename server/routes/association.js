const express = require('express');
const associationController = require('../controllers/accociation.controller.js');
// upload pdf
const upload = require("../middleware/upload.middleware");
const {checkUser, checkAdmin, requireAuth} = require('../middleware/auth.middleware');
const router = express.Router();

 
router.get('/get-association/:id', associationController.read);
router.get('/get-all-association/', associationController.getAllAssociation);



module.exports = router;