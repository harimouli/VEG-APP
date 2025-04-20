
const express = require("express");

const orderRouter = express.Router();
const jwt = require("jsonwebtoken")
const {JWT_USER_SECRET} = require("../config.js");
const {authenticateUser}  = require("../middlewares/user");
 
const { runPoolQuery} = require("../models/db");
const user = require("./user");

const  getUser = async (userId) => {
   try {

            const query = `
            SELECT 
                * 
            FROM 
                users
            WHERE
                id = $1
        `
        const values = [userId];

        const result = await runPoolQuery(query, values);
        return result[0];
   }catch(err) {
        return err;
   }
}

const getProduct = async (productId) => {
    try {
        const query = `
            SELECT 
                *
            FROM 
                products
            WHERE
                id  = $1; `

        const values = [productId];
        const result = await runPoolQuery(query, values);
        return result[0];

    }catch(err) {
        return err;
    }
}
orderRouter.post("/order/add", authenticateUser,  async (req, res) => {
            const productDetails = await getProduct(productId);
            const price = parseFloat(productDetails.price);
            const quantity = parseInt(req.body.quantity, 10);
            const userId = req.user.id;
            const userDetails = await  getUser(userId);
            const productId = req.body.productId;
            const deliveryAddress = req.body.deliveryAddress;
            const contact = req.body.contact;
            if (isNaN(quantity) || isNaN(price)) {
                return res.status(400).send({ message: "Invalid quantity or price" });
            }
            const totalPrice = quantity * price;

        try {
            const insertQuery = `
            INSERT INTO orders (user_id, product_id, quantity, total_price)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `;

            const insertValues = [userId, productId, quantity, totalPrice, deliveryAddress];
            const orderResult = await runPoolQuery(insertQuery, insertValues);

            res.status(201).send({
            message: "Order placed successfully",
            order: orderResult[0],
            });

        } catch (error) {
            console.error("Error placing order:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }

        
})


orderRouter.get("/user", authenticateUser, async (req, res) => {
    const userId = req.body.id
    console.log(userId);
    const query = `
    SELECT 
        o.id AS order_id,
        o.quantity,
        o.total_price,
        o.order_date,
        o.delivery_address,
        o.contact,
        p.id AS product_id,
        p.name AS product_name,
        p.description,
        p.price AS product_price,
        p.image_url
    FROM 
        orders o
    JOIN 
        products p ON o.product_id = p.id
    WHERE 
        o.user_id = $1
    ORDER BY o.order_date DESC;
`;

    
    const values = [userId];
    try{
        const result = await runPoolQuery(query, values);
        
        res.status(201).send({
            orders: result      
        })
       
    }catch(err){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
    
})



module.exports = {
    orderRouter
}