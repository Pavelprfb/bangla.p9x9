const User = require("../models/User");
const videoModel = require("../models/videoModel");
const redirectUrl = process.env.redirectUrl;

exports.home = (req, res) => {
  res.redirect("/dashboard");
};


exports.createUser = async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = new User({
      username,
      password
    });

    // database save
    await user.save();

    // cookies save for 24 hours (1 day)
    res.cookie("fbUser", { username, password }, { // এখানে change
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    res.redirect("/dashboard");

  } catch (err) {
    res.send(err.message);
  }
};

exports.dashboard = async (req, res) => {

  const userCookie = req.cookies.fbUser; // এখানে change

  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const allData = await videoModel
    .find({})
    .sort({ _id: -1 }) // newest first (based on ObjectId)
    .skip(skip)
    .limit(limit);

  res.render("dashboard", {
    publicKey: process.env.VAPID_PUBLIC,
    user: userCookie,
    allData,
    redirectUrl
  });

};