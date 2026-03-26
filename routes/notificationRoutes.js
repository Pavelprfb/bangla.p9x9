const express = require("express");
const router = express.Router();

const {
  saveSubscription,
  adminPage,
  sendNotification
} = require("../controllers/notificationController");

router.post("/subscribe", saveSubscription);

router.get("/admin/notification", adminPage);

router.post("/admin/notification", sendNotification);

module.exports = router;