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
router.get("/", userController.getAllUsers);
router.get("/accepted", userController.getAllAcceptedUsers);
//search user
router.get("/search/:name", userController.SearchUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", requireAuth, userController.updateUser);
router.put("/accept-user/:id", userController.acceptUser);
router.delete("/:id", userController.deleteUser);

// upload
router.patch("/upload/:id", [checkUser,upload], userController.uploadProfil);


module.exports = router;