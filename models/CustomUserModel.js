const mongoose = require("mongoose");

// 6 অক্ষরের র‍্যান্ডম রেফার কোড জেনারেট করার ফাংশন
function generateReferCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const CustomUserSchema = new mongoose.Schema({
  profilePic: { 
    type: String, 
    required: true
  },
  
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },

  username: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },

  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"]
  },

  number: { 
    type: String, 
    required: true, 
    unique: true
  },

  age: { 
    type: Number, 
    required: true 
  },

  password: { 
    type: String, 
    required: true,
    minlength: 6,
    select: false
  },

  status: { 
    type: Boolean,
    default: true 
  },

  statusMessage: {
    type: String,
    default: "" 
  },
  
  coin: {
    type: String,
    default: 5 
  },
  
  refers: {
    type: [String],
    default: []
  },
  
  referCode: {
    type: String,
    default: generateReferCode
  },

}, {
  timestamps: true
});

module.exports = mongoose.model("CustomUserModel", CustomUserSchema);