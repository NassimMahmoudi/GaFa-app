const express = require('express');
const docsController = require('../controllers/docs.controller.js');
// upload pdf
const upload = require("../middlewares/uploadpdf.middleware");
const {checkUser, checkAdmin, requireAuth} = require('../middlewares/auth.middleware');
const router = express.Router();

 
router.get('/get-docs/:id', docsController.readDocs);
router.patch('/add-docs/:id',upload, docsController.addDocs);
router.patch('/delete-docs/:assocciationId/:docId', docsController.deleteDoc);


module.exports = router;