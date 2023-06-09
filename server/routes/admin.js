const express = require("express");
const adminController = require("../controllers/admin.controller.js");
const {checkUser, checkAdmin, requireAuth} = require('../middlewares/auth.middleware');
const upload = require("../middlewares/upload.middleware");
const router = express.Router();


// auth
router.post("/register", upload, adminController.signUp);
router.post("/login", adminController.signIn);
router.get("/logout",checkAdmin, adminController.logout);
router.get("/:id",checkAdmin, adminController.adminInfo);
// upload
router.patch("/upload/:id", [checkAdmin,upload], adminController.uploadProfil);    

module.exports = router;