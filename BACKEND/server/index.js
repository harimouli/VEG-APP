const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());



const {runClientQuery, runPoolQuery, getColumnNames, getProductData} = require("./models/db");

const {insertProductsData} = require("./models/addProducts.js");
const { userRouter } = require("./routes/user.js");
const {orderRouter} = require("./routes/orders.js");
const {adminRouter} = require("./routes/admin.js");
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);  
app.use("/api/admin", adminRouter); 

app.get("/products", async (req, res) => {
    try {
      const query = `
        SELECT * FROM products;
      `

      const productsArray = await runPoolQuery(query);
      res.send({
        productsArray: productsArray 
      })
      return;
    }catch(err) {
      res.send({
        Error: err
      })
    }

})   





























//userAuth 
app.get("/products", () => {
  
})




app.listen(3000, () => {
  console.log("Server running on port 4000");
});