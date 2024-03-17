const Products = require("../models/productModel");
const fs = require("fs");
const slugify = require("slugify");
var braintree = require("braintree");
const orderModel = require("../models/orderModel")
const dotenv = require("dotenv")


dotenv.config()

//payment gateway: we will get the token from the gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});








//POST - http://localhost:8080/api/v1/product/create-product
const createProductController = async (req,res)=> {
  try {
    const {name, description, price, category, quantity, shipping} = req.fields;
    const { photo } = req.files;
    //validation
    switch(true) {
      case !name:
        return res.status(500).send({error : "Name is required"})
      case !description:
        return res.status(500).send({error : "Description is required"})
      case !price:
        return res.status(500).send({error : "Price is required"})
      case !category:
        return res.status(500).send({error : "Category is required"}) 
      case !quantity:
        return res.status(500).send({error : "Quantity is required"}) 
      case photo && photo.size > 1000000:
        return res.status(500).send({error : "Photo is required and should be less than 1MB"}) 
    }
    const products = new Products({...req.fields, slug:slugify(name)});
    if(photo) {
      products.photo.data = fs.readFileSync(photo.path)
      products.photo.contentType = photo.type 
    }
    await products.save()
    res.status(201).send({
      success : true,
      message : "Product Created Successfully",
      products
    })

  }
  catch(error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message : "Error in creating product"
    })
  }
}


//get all products 
//GET - http://localhost:8080/api/v1/product/get-product/
const getProductController = async (req, res)=> {
  try {
    const products = await Products.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1}); //-photo except product everthing will create
    res.status(200).send({
      success : true,
      countTotal: products.length,
      message: "All Products",
      products
    })
  }
  catch(error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message : "Error in getting products",
      error: error.message
    })
  }
}
 

//get single product
//GET - http://localhost:8080/api/v1/product/get-product/BT-watch
const getSingleProductController = async(req,res)=> {
  try {
    const product = await Products.findOne({slug: req.params.slug}).select("-photo").populate("category");
    res.status(200).send({
      success : true,
      message : "single product fetched",
      product
    })
  }
  catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error while getting single product",
      error
    })
  }
}

//get photo 
const productPhotoController = async (req,res)=> {
  try {
    const product = await Products.findById(req.params.pid).select("photo")
    if(product.photo.data) {
      res.set("Content-type", product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message : "Error while getting photo",
      error
    })
  }
}

const  deleteProductController = async (req,res)=> {
  try {
    await Products.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};


//update product
const updateProductController = async (req, res)=> {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await Products.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

//Filters 
const productFiltersController = async(req,res)=>{
  try{
    const {checked,radio} = req.body;
    let args = {}
    if(checked.length >0) args.category = checked
    if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
    const products = await Products.find(args)
    res.status(200).send({
      success:true,
      products,
    })
  }catch(error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message: "Error While Filering Products",
      error
    })
  }
}

//productCountController
const productCountController = async (req,res)=> {
  try {
    const total = await Products.find({}).estimatedDocumentCount()
    res.status(200).send({
      success: true,
      total
    })
  }
  catch(error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message: "Error in Product count",
      error  
    })
  }
}


//productList based on page
const productListController = async (req,res)=> {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page :  1
    const products = await Products.find({}).select("-photo").skip((page -1)* perPage).limit(perPage).sort({createdAt:-1});
    res.status(200).send({
      success: true,
      products
    })
  }
  catch(error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message: "Error in per page ctrl",
      error
    })
  }
} 

//payment gateway api, documentation
const braintreeTokenController = async(req,res) => {
  try {
    gateway.clientToken.generate({}, function(err,response){
      if(err){
        res.status(500).send(err)
      }else {
        res.send(response)
      }
    })
  }
  catch(error) {
    console.log(error)
  }

}

//payment
const braintreePaymentController = async(req,res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports ={ createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, braintreeTokenController, braintreePaymentController };

//{$gte: radio[0], $lte:radio[1]}greater then and lesser than
//select("-photo") photo will not select
//skip((page -1)*: see the mongoose documentation
//nonce coming from the documentation 
