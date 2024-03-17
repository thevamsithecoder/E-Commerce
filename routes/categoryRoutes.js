const express = require("express");
const router = express.Router();
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");
const {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController} = require("../controllers/categoryController");

//routes
//create category
router.post("/create-category", requireLogin, isAdmin, createCategoryController);

//update category
router.put("/update-category/:id", requireLogin, isAdmin, updateCategoryController);

//get all category
router.get("/get-category", categoryController);

//get single category
router.get("/single-category/:slug", singleCategoryController); //when we wants to update single value and wants to get the single data then we use ID

//delete category
router.delete("/delete-category/:id", requireLogin, isAdmin, deleteCategoryController);

module.exports = router;
//ctrl+space imported automatically shortcut