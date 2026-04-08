const Subscription = require("../models/Subscription");
const videoModel = require("../models/videoModel");
const webpush = require("../config/vapid");

exports.saveSubscription = async (req, res) => {

  const sub = req.body;

  // duplicate subscription prevent
  const exist = await Subscription.findOne({ endpoint: sub.endpoint });

  if (!exist) {
    await Subscription.create(sub);
  }

  res.json({ success: true });

};


exports.adminPage = async (req, res) => {
  const allData = await Subscription.find({});
  const videoData = await videoModel.find({});
  const dataLength = allData.length
  res.render("adminNotification", { dataLength, videoData });

};


exports.sendNotification = async (req, res) => {

  const { title } = req.body;

  const image = req.body.image;

  const url = req.body.url;

  const subs = await Subscription.find();

  const payload = JSON.stringify({
    title,
    image,
    url
  });

  for (const sub of subs) {

    try {

      await webpush.sendNotification(sub, payload);

    } catch (err) {

      console.log("Push Error:", err.statusCode);

      // remove expired subscription
      if (err.statusCode === 410 || err.statusCode === 404) {

        await Subscription.deleteOne({ _id: sub._id });

      }

    }

  }

  res.send("Notification Sent To All Users");

};