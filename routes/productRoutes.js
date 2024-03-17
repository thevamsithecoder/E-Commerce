const express = require("express");
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, braintreeTokenController, braintreePaymentController } = require("../controllers/productController");
const router = express.Router();
const formidable = require('express-formidable');


//routes for creating a product
router.post("/create-product", requireLogin, isAdmin, formidable() ,createProductController)

//routes for updating a product
router.put("/update-product/:pid", requireLogin, isAdmin, formidable() ,updateProductController)

//get products
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController)

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count : this is total product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//payments route
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireLogin, braintreePaymentController);

//we will get according to page wise 
module.exports = router;