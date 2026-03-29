const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// Pages
router.get("/create", taskController.create);
router.get("/update", taskController.updatePage);
router.get("/delete", taskController.deletePage);

// Actions
router.post("/create", taskController.createTask);
router.post("/update", taskController.updateTask);
router.post("/delete", taskController.deleteTask);
router.post("/calculate", taskController.calculate);

module.exports = router;