const express = require("express");
var path = require("path");
const juryController = require("../controllers/jury.controller");
const {checkUser, checkAdmin, requireAuth} = require('../middlewares/auth.middleware');
const router = express.Router();
const upload = require("../middlewares/upload.middleware");



// auth
router.post("/register", upload, juryController.signUp);
router.post("/login", juryController.signIn);
router.get("/logout", checkUser,juryController.logout);

// Jury DB
router.get("/", juryController.getAllJurys);
//search Jury
router.get("/search/:name", juryController.SearchJurys);
router.get("/:id", juryController.juryInfo);
router.put("/:id", requireAuth, juryController.updateJury);
router.delete("/:id", juryController.deleteJury);



module.exports = router;