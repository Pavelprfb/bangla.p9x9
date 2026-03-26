require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const videoModel = require("./models/videoModel");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");

const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const videoRoute = require("./routes/videoRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger);

app.use(express.static("public"));
app.use("/", userRoutes);

app.use("/", notificationRoutes);
app.use("/video", videoRoute);
app.use("/admin", adminRoute);


// 404 Page - catch all other routes
app.use( async (req, res, next) => {
  
  
  const userCookie = req.cookies.user;


  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const allData = await videoModel
    .find({})
    .skip(skip)
    .limit(limit);

  
  
  res.status(404).render('404', {allData}); // render the 404.ejs page
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});