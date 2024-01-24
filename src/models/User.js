const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    // required: true,
  },
  avatar: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
    minlength: [6, "Password is too short"],
  },
  dateOfBirth: {
    type: Date,
  },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
  },
  roles: {
    type: [String], 
    enum: ["ADMIN", "MEMBER", "SENIOR","USER"],
    default: ["USER"]
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  status:{
    type: String,
    enum:["PENDING","ACTIVE","BLOCK"],
    default: "PENDING"
  },
  registered:{
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
