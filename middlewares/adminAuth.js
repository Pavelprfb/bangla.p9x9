module.exports = (req, res, next) => {
  // চেক করা হচ্ছে cookie এ admin id আছে কিনা
  if (req.cookies && req.cookies.admin) {
    next(); // অ্যাক্সেস অনুমোদন
  } else {
    res.redirect("/admin/login"); // না থাকলে login page এ redirect
  }
};