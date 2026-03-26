const express = require("express");
const router = express.Router();

const {
  home,
  createUser,
  dashboard
} = require("../controllers/userController");

router.get("/", home);
router.get("/dashboard", dashboard);

router.post("/create-user", createUser);

module.exports = router;