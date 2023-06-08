const express = require('express');
const associationController = require('../controllers/association.controller.js');
// upload pdf
const upload = require("../middlewares/upload.middleware");
const {checkJury, checkAdmin, requireAuth} = require('../middlewares/auth.middleware');
const router = express.Router();

 
router.get('/get-association/:id', requireAuth,associationController.associationInfo);
router.get('/get-association-by-user/:id',requireAuth, associationController.associationInfoByUser);
router.put('/accept-association/:id', checkJury,associationController.acceptAssociation);
router.get('/get-all-association/',requireAuth, associationController.getAllAssociation);



module.exports = router;