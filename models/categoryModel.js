const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true,
  },
  slug: {  //if anywhere space is available then it converts it into - hypen.
    type:String,
    lowercase : true
  },
})

const Category = mongoose.model("Category", categorySchema);


module.exports = Category;