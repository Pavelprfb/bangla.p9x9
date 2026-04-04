const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");

const {
  loginPage,
  loginAdmin,
  adminPage,
  logoutAdmin,
  showData,
  deleteUser,
  custom_all_user,
  userBan,
  allTask
} = require("../controllers/adminController");

// Login Form
router.get("/login", loginPage);

// Handle Login
router.post("/login", loginAdmin);

// Logout
router.get("/logout", logoutAdmin);
router.get("/showdata", showData);
router.get("/delete/:id", deleteUser);
router.get("/custom_all_user/", custom_all_user);
router.post("/user/ban", userBan);
router.get("/allTask", allTask);

// Admin Dashboard (protected by middleware)
router.get("/", adminAuth, adminPage);

module.exports = router;