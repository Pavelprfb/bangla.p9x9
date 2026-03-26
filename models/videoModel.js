const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({

  routeName: { type: String, required: true, unique: true },
  imageLink: { type: String, required: true },
  videoLink: { type: String, required: true },
  title: { type: String, required: true },


});

module.exports = mongoose.model("videoModel", videoSchema);