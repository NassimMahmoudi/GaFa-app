const express = require('express');
const docsController = require('../controllers/docs.controller.js');
// upload pdf
const upload = require("../middleware/upload.middleware");
const {checkUser, checkAdmin, requireAuth} = require('../middleware/auth.middleware');
const router = express.Router();

 
router.get('/get-docs/:id', docsController.readDocs);

router.put('/edit-docs/:id', docsController.updateDocs);
router.put('/accept-association/:id', docsController.acceptAssociation);


module.exports = router;