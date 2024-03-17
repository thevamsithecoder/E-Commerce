const Category = require("../models/categoryModel");
const slugify = require("slugify");

//POST - http://localhost:8080/api/v1/category/create-category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;//whatever I write in my model that I destructure it here
    if(!name) {
      return res.status(400).send({message : "Name is required"})
    }
    const existingCategory = await Category.findOne({ name })//basis on the name we are finding 
    if(existingCategory) {
      return res.status(200).send({
        success:false,
        message: "Category already exists"
      })
    }
    const category = await new Category({
      name, 
      slug: slugify(name)}).save();
      res.status(201).send({ //201 is for anything creating new
      success:true,
      message: "New category created",
      category,
    })
  }catch(error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message: "Error in creating category"
    })
  }
}


//update category
//PUT : http://localhost:8080/api/v1/category/update-category/65e1801ba0be919656f4ae44
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id,{name, slug: slugify(name)}, {new:true});//3 paras
    res.status(200).send({
      success:true,
      message: "Category Updated Successfully",
      category, 
    })
  }
  catch(error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message : "Error while updating category"
    })
  }
}

//get all category 
//GET - http://localhost:8080/api/v1/category/get-category
const categoryController = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message : "All Categories List",
      category, //this is use in frontend
    })   
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message: "Error while getting all category"
    })
  }
}

//get single category 
//GET - http://localhost:8080/api/v1/category/single-category/kids-collection(slug)
const singleCategoryController = async (req,res)=> {
  try {
    // const { slug } = req.params; //instead we can write directly inside the findone
    const category = await Category.findOne({slug: req.params.slug});
    res.status(200).send({
      success :true,
      message : "Get Single Category Successfully",
      category
    })

  }catch(error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message : "Error while getting single category"
    })
  }
}


//delete category
const deleteCategoryController = async (req,res)=> {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).send({
      success :true,
      message : "Category Deleted Successfully",
      category
    })
  }
  catch(error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message : "Error while deleting category"
    })
  }
}
module.exports ={ createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController};