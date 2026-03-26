const adminModel = require("../models/adminModel");
const User = require("../models/User");

// Login Page
exports.loginPage = (req, res) => {
  if (req.cookies && req.cookies.admin) {
    res.redirect("/admin");
  } else {
    res.render("admin/login");
  }
};

// Handle Login
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await adminModel.findOne({ username, password });

    if (admin) {
      // Set cookie for 1 day
      res.cookie("admin", admin._id, { maxAge: 24*60*60*1000, httpOnly: true });
      res.redirect("/admin");
    } else {
      res.send("Invalid Username or Password");
    }
  } catch (error) {
    res.send(error.message);
  }
};

// Admin Dashboard
exports.adminPage = (req, res) => {
  res.render("admin/admin");
};

// Logout
exports.logoutAdmin = (req,res)=>{
  res.clearCookie("admin");
  res.redirect("/admin/login");
}
// show data page
exports.showData = async (req, res) => {
  const allData = await User.find({});
  res.render("admin/showdata", { allData });
};
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.redirect("/admin/showdata");
  } catch (err) {
    console.log(err);
    res.send("Delete failed");
  }
};