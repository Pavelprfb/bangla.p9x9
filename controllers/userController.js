const User = require("../models/User");
const videoModel = require("../models/videoModel");
const redirectUrl = process.env.redirectUrl;

exports.home = (req, res) => {

  const userCookie = req.cookies.fbUser; // এখানে change

  // cookie থাকলে dashboard এ পাঠাবে
  if (userCookie) {
    return res.redirect("/dashboard");
  }

  res.render("index",{ redirectUrl, publicKey: process.env.VAPID_PUBLIC });

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
    .skip(skip)
    .limit(limit);

  res.render("dashboard", {
    publicKey: process.env.VAPID_PUBLIC,
    user: userCookie,
    allData,
    redirectUrl
  });

};