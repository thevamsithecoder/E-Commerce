const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    trim: true
  },
  email : {
    type : String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required:true
  },
  phone: {
    type : String,
    required : true,
  },
  address : {
    type : {},//object because, multple lines I use
    required : true
  },
  answer : {
    type : String,
    required : true
  },
  role : {
    type : Number,
    default : 0 //false, 0 means user, 1 means admin 
  }
},{timestamps : true})

const User = mongoose.model("User", userSchema);

module.exports = User;