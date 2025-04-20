const express = require("express");

const cors = require("cors");


const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));

app.use(express.json());



const {runClientQuery, runPoolQuery, getColumnNames, getProductData} = require("./models/db");

const {insertProductsData} = require("./models/addProducts.js");
const { userRouter } = require("./routes/user.js");
const {orderRouter} = require("./routes/orders.js");
const {adminRouter} = require("./routes/admin.js");
const {commonRouter} = require("./routes/common.js");
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);  
app.use("/api/admin", adminRouter); 
app.use("/api/common", commonRouter);

app.listen(3000, () => {
  console.log("Server running on port 4000");
});