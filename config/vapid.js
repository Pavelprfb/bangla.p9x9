const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

module.exports = webpush;