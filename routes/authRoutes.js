const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} = require("../controllers/authController");
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");

//signup route
router.post("/register", registerController);

//login route
router.post("/login", loginController);

//forgot password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireLogin, isAdmin, testController); //first middleware is for token checking and second middleware for admin checking

//protected user route auth
router.get("/user-auth", requireLogin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route admin
router.get("/admin-auth", requireLogin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireLogin, updateProfileController);

//orders
router.get("/orders", requireLogin, getOrdersController);

//all orders
router.get("/all-orders", requireLogin, isAdmin, getAllOrdersController);


//order status update
router.put("/order-status/:orderId",  requireLogin, isAdmin, orderStatusController);
module.exports = router;