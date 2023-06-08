const express = require("express");
var path = require("path");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const {checkUser, checkAdmin, requireAuth} = require('../middlewares/auth.middleware');
const router = express.Router();
const upload = require("../middlewares/upload.middleware");



// auth
router.post("/register", upload, authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", checkUser,authController.logout);

// user DB
router.get("/", requireAuth,userController.getAllUsers);
//search user
router.get("/search/:name",requireAuth, userController.SearchUsers);
router.get("/:id", requireAuth,userController.userInfo);
router.put("/:id", requireAuth, userController.updateUser);
router.put("/block/:id", checkAdmin, userController.blockUser);
router.delete("/:id", userController.deleteUser);

// upload
router.patch("/upload/:id", [checkUser,upload], userController.uploadProfil);


module.exports = router;