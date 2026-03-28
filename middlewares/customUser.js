const CustomUserModel = require("../models/CustomUserModel.js");

// Middleware to check if user is logged in
const checkUserAuth = async (req, res, next) => {
  try {
    const userData = req.cookies.user; // cookies এ user data check
    if (!userData) {
      return res.redirect("/user/login"); // logged in না থাকলে login page
    }
    next();
  } catch (err) {
    console.error(err);
    res.redirect("/user/login");
  }
};

const redirectIfLoggedIn = (req, res, next) => {
  if (req.cookies.user) {
    return res.redirect("/user/dashboard");
  }
  next();
};

module.exports = { checkUserAuth, redirectIfLoggedIn };
