const express = require("express");
var path = require("path");
const juryController = require("../controllers/jury.controller");
const {checkJury, checkAdmin, requireAuth} = require('../middlewares/auth.middleware');
const router = express.Router();
const upload = require("../middlewares/upload.middleware");



// auth
router.post("/add", upload, juryController.add);
router.post("/login", juryController.signIn);
router.get("/logout", checkJury,juryController.logout);

// Jury
router.get("/",checkAdmin, juryController.getAllJurys);
router.get("/:id", juryController.juryInfo);
//router.put("/:id", requireAuth, juryController.updateJury);
router.delete("/:id",checkAdmin, juryController.deleteJury);



module.exports = router;