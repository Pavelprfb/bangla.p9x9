const express = require("express");
const router = express.Router();

const {
  home,
  createPage,
  updatePage,
  editPage,
  deletePage,
  createVideo,
  updateVideo,
  deleteVideo,
  randomVideo
} = require("../controllers/videoController");


router.get("/bangla/:routeName", home);
router.get("/random", randomVideo);

router.get("/create", createPage);
router.get("/update", updatePage);
router.get("/update/:routeName", editPage);
router.get("/delete", deletePage);

router.post("/create", createVideo);
router.post("/update/:routeName", updateVideo);
router.post("/delete/:routeName", deleteVideo);

module.exports = router;