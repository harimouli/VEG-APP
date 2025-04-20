const express = require("express");
const commonRouter = express.Router();
const {runPoolQuery} = require("../models/db");

const {authenticateUser} = require("../middlewares/user.js")

commonRouter.get("/products", async (req, res) => {
    try {
      const query = `
        SELECT * FROM products;
      `
     
      const productsArray = await runPoolQuery(query);
      
      res.send(productsArray )
      return;
    }catch(err) {
      res.send({
        Error: err
      })
    }

})   

commonRouter.get("/products/:id",  async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    const query  = `
        SELECT 
            *
        FROM 
            products
        WHERE
            id = $1
    `
    const values = [productId];
    try {
        const result = await runPoolQuery(query, values);
        res.status(201).send(result);
    }catch(err){
        res.send({
            message: "Internal Sever Error"
        });
    }

})




module.exports = {
    commonRouter
}