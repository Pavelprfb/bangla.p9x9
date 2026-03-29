const express = require("express");
const router = express.Router();
const CUC = require("../controllers/customUserController.js");
const { checkUserAuth, redirectIfLoggedIn } = require("../middlewares/customUser.js");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads'); // uploads folder
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Page routes
router.get("/login", redirectIfLoggedIn, CUC.login);
router.get("/signup", redirectIfLoggedIn, CUC.signup);
router.get("/task", CUC.task);
router.get("/dashboard", CUC.dashboard);
router.get("/leaderboard", CUC.leaderboard);

// POST routes
router.post("/signup", upload.single('profilePic'), CUC.signupPost); // profilePic field
router.post("/login", CUC.loginPost);
router.get("/logout", CUC.logout);

module.exports = router;