const TaskModel = require("../models/TaskModel");
const CustomUserModel = require("../models/CustomUserModel");

// =========================
// Render Pages
// =========================
exports.create = async (req, res) => {
  res.render("task/create");
};

// সব task show করার জন্য
exports.updatePage = async (req, res) => {
  const tasks = await TaskModel.find().sort({ createdAt: -1 });
  res.render("task/update", { tasks });
};

exports.deletePage = async (req, res) => {
  const tasks = await TaskModel.find().sort({ createdAt: -1 });
  res.render("task/delete", { tasks });
};


// =========================
// Create Task
// =========================
exports.createTask = async (req, res) => {
  try {
    const { taskPic, fullName, coin, link } = req.body;

    const newTask = new TaskModel({
      taskPic,
      fullName,
      coin,
      link
    });

    await newTask.save();

    res.send("Task Created Successfully");
  } catch (err) {
    console.error(err);
    res.send("Error creating task");
  }
};

// =========================
// Update Task
// =========================
exports.updateTask = async (req, res) => {
  try {
    const { id, taskPic, fullName, coin, link } = req.body;

    await TaskModel.findByIdAndUpdate(id, {
      taskPic,
      fullName,
      coin,
      link
    });

    res.send("Task Updated Successfully");
  } catch (err) {
    console.error(err);
    res.send("Error updating task");
  }
};

// =========================
// Delete Task
// =========================
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;

    await TaskModel.findByIdAndDelete(id);

    res.send("Task Deleted Successfully");
  } catch (err) {
    console.error(err);
    res.send("Error deleting task");
  }
};
exports.calculate = async (req, res) => {
  try {
    let { singleId, singleCoin, singleEmail } = req.body;
    singleCoin = Number(singleCoin);
    // TaskModel থেকে ডাটা খুঁজে আনা
    const taskFindData = await TaskModel.findOne({ _id: singleId });
    if (!taskFindData) {
      return res.status(404).json({ error: "Task not found" });
    }

    // যদি singleEmail আগে না থাকে, তাহলে email array-এ push করা
    if (!taskFindData.email.includes(singleEmail)) {
      taskFindData.email.push(singleEmail);
      await taskFindData.save();
      console.log("Updated task emails:", taskFindData.email);
    } else {
      console.log("Email already exists in task emails");
    }

    // CustomUserModel থেকে ডাটা খুঁজে আনা
    const findData = await CustomUserModel.findOne({ email: singleEmail });
    if (!findData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Coin update করা
    findData.coin = (findData.coin || 0) + Number(singleCoin);
    await findData.save();
    console.log("Updated user coin:", findData.coin);

    return res.json({ status: "success", taskEmails: taskFindData.email, userCoin: findData.coin });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
