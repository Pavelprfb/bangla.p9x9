const adminModel = require("../models/adminModel");
const CustomUserModel = require("../models/CustomUserModel");
const TaskModel = require("../models/TaskModel");
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
exports.custom_all_user = async (req, res) => {
  try {
    const allUser = await CustomUserModel.find({});

    // সব ইউজারের email-এর array বানানো
    const emails = allUser.map(user => user.email);

    // সব টাস্ক যা এই emails এ আছে
    const allTask = await TaskModel.find({ email: { $in: emails } });

    // এখন ইউজারের claimed সংখ্যা হিসাব করি
    const usersWithClaimed = allUser.map(user => {
      // প্রতিটি ইউজারের জন্য টাস্ক filter করি
      const claimedTasks = allTask.filter(task => task.email.includes(user.email));
      return {
        ...user.toObject(),  // mongoose document কে plain object এ convert করা
        claimed: claimedTasks.length
      };
    });

    res.render("admin/custom_all_user", { allUser: usersWithClaimed });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
exports.userBan = async (req, res) => {
  try {
    const { _id, status, statusMessage } = req.body;

    // Validation
    if (!_id) {
      return res.status(400).send("User ID required");
    }

    // String → Boolean convert (কারণ form থেকে string আসে)
    const updatedStatus = status === "true";

    // Update user
    const updatedUser = await CustomUserModel.findByIdAndUpdate(
      _id,
      {
        status: updatedStatus,
        statusMessage: statusMessage || ""
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    // Redirect back
      res.redirect("/admin/custom_all_user");

  } catch (error) {
    console.error("User Ban Error:", error);
    res.status(500).send("Server Error");
  }
};
exports.allTask = async (req, res) => {
  const allData = await TaskModel.find({});
  res.render("admin/allTask", {allData });
};