const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  
  taskPic: { 
    type: String, 
    required: true
  },
  
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },

  coin: { 
    type: Number, 
    required: true
  },

  link: { 
    type: String, 
    required: true, 
    lowercase: true
  },

  email: { 
    type: [String], 
    default: []
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("TaskModel", taskSchema);