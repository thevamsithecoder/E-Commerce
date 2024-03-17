const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
//proteched routes token base
const requireLogin = async (req,res,next)=> {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decode;
    next(); //it will move forward next code will run
  }
  catch(error) {
    console.log(error)
  }
};//tokens are always available at req.headers.authorization


//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if(user.role !== 1) {
      return res.status(401).send({
        success:false,
        message: "Unauthorized Access"
      })
    }else {
      next()
    }
  }
  catch(error) {
    console.log(error);
    res.status(401).send({
      success: false,
      err,
      message: "Error in admin middleware"
    })
  }
}


module.exports = {requireLogin, isAdmin};
//we verify the token in two ways 
//directly pass the token in auth->Bearer section
//secondly pass the token in headers like headers as Authorization and value as a token