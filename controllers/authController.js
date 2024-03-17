const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const orderModel = require("../models/orderModel");

const registerController = async (req,res) => {
  try {
    const {name, email, password, phone, address, answer} = req.body;
    //validation
    if(!name) {
      return res.send({message: "Name is Required"})//name section is blank then display to the user name is required
    }
    if(!email) {
      return res.send({message: "Email is Required"})
    }
    if(!password) {
      return res.send({message: "Password is Required"})
    }
    if(!phone) {
      return res.send({message: "Phone Number is Required"})
    }
    if(!address) {
      return res.send({error: "Address is Required"})
    }
    if(!answer) {
      return res.send({error: "Answer is Required"})
    }
    //check user
    const existingUser = await userModel.findOne({ email })
    //existing user
    if(existingUser) {
      return res.status(200).send({
        success:false,
        message: "Already Registered Please login"
      })
    }
    //register user
    const hashedPassword = await hashPassword(password)
    //save
    const user = await new userModel({name, email, phone, address, password:hashedPassword, answer}).save(); //I forget to write the await here so tha my entered user details not displayed i my vs code terminal
    res.status(201).send({
      success:true,
      message : "User Registered Successfully",
      user
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message: "Error in Registration",
      error,
    })
  }
  
}

//Login, this will show in the testing
//http://localhost:8080/api/v1/auth/login
const loginController = async(req, res)=> {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController, for forgot password you will get OTP that is a paid so I have used question over here
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if(!email) {
      res.status(400).send({ message : "Email is required" })
    }
    if(!answer) {
      res.status(400).send({ message : "Answer is required" })
    }
    if(!newPassword) {
      res.status(400).send({ message : "New Password is required" })
    }
    //check
    const user = await userModel.findOne({ email, answer})
    //validation
    if(!user) {
      return res.status(404).send({
        success:false,
        message:"Wrong Email or Answer"
      })
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password:hashed });
    res.status(200).send({
      success:true,
      message: "Password Reset Successfully"
    })
  }
  catch(error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      })
    }
  }



//test controller
const testController = (req, res) => {
  try {
    res.send("Protected route")
  }
  catch(error) {
    console.log(error);
    res.send({error})
  }
}

//update profile

const updateProfileController = async(req,res)=> {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
const getOrdersController = async (req,res)=> {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//all orders
const getAllOrdersController = async (req,res)=>{
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};


const orderStatusController = async (req,res)=> {
  try {
    const {orderId} = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
    res.json(orders)
    
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message : "Error while updating order",
      error
    })
  }
}
module.exports = {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController}; 

//name : name  || user.name => if you get the name then update the name otherwise keep as it is.
//-photo ; deselecting photo
// .sort({createdAt:"-1"}) //latest order will appear first