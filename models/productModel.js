const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  slug : {
    type : String,
    required : true,
  },
  description:{
    type : String,
    required: true
  },
  price : {
    type : Number,
    required : true
  },
  category : {
    type : mongoose.ObjectId,//this is coming from categoryModel and this is the ID of category model
    ref : "Category", //this is coming from categoryModel 
    required: true
  },
  quantity : {
    type : Number,
    required: true
  },
  photo : {
    data:Buffer, //with the help of data we can save the file or image
    contentType : String
  },
  shipping : {
    type : Boolean,
  }

},{timestamps : true})

const Products = mongoose.model("Products", productSchema);

module.exports = Products;