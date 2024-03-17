const express = require("express");
const app = express(); 
const dotenv = require("dotenv"); //to store the sensitive data 
const connectDB = require("./Database/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");

dotenv.config()

//middlewares
app.use(cors())

app.use(express.json()) //enableing json so that we send the data in the form of json
app.use(express.static(path.join(__dirname, "./Client/dist")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)

app.use("*", function(req,res) {
  res.sendFile(path.join(__dirname, "./Client/dist/index.html"))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> {
  console.log(`Server running on ${PORT}`);
})
connectDB();