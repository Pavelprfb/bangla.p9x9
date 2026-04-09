const videoModel = require("../models/videoModel");

const redirectUrl = process.env.redirectUrl;
// VIDEO PAGE
exports.home = async (req, res) => {
  try {
    
    const userCookie = req.cookies.user;
    const { routeName } = req.params;
    
    
    const videoData = await videoModel.findOne({ routeName });
    const allData = await videoModel.aggregate([
      { $sample: { size: 15 } }
    ]);

    res.render("video/video", { videoData, redirectUrl, publicKey: process.env.VAPID_PUBLIC, user: userCookie, allData});

  } catch (error) {
    res.send(error.message);
  }
};



// CREATE PAGE
exports.createPage = (req, res) => {
  res.render("video/create");
};



// UPDATE PAGE
exports.updatePage = async (req, res) => {
  const data = await videoModel.find({});
  res.render("video/edit", { data });
};
exports.editPage = async (req, res) => {
  const routeName = req.params.routeName;
  const data = await videoModel.findOne({routeName});
  res.render("video/update", { data });
};



// DELETE PAGE
exports.deletePage = async (req, res) => {
  const data = await videoModel.find({});
  res.render("video/delete", { data });
};



// CREATE VIDEO
exports.createVideo = async (req, res) => {
  try {

    const { routeName, imageLink, videoLink, title } = req.body;

    const newVideo = new videoModel({
      routeName,
      imageLink,
      videoLink,
      title
    });

    await newVideo.save();

    res.send("Video Created Successfully");

  } catch (error) {
    res.send(error.message);
  }
};



// UPDATE VIDEO
exports.updateVideo = async (req, res) => {
  try {

    const { routeName } = req.params;

    await videoModel.updateOne(
      { routeName },
      {
        $set: req.body
      }
    );

    res.send("Video Updated Successfully");

  } catch (error) {
    res.send(error.message);
  }
};



// DELETE VIDEO
exports.deleteVideo = async (req, res) => {
  try {

    const { routeName } = req.params;

    await videoModel.deleteOne({ routeName });

    res.send("Video Deleted Successfully");

  } catch (error) {
    res.send(error.message);
  }
};
exports.randomVideo = async (req, res) => {

  const userCookie = req.cookies.user;


  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const allData = await videoModel
    .find({})
    .skip(skip)
    .limit(limit);

  res.render("video/randomVideo", {
    publicKey: process.env.VAPID_PUBLIC,
    user: userCookie,
    allData,
    redirectUrl
  });

};