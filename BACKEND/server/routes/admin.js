const express = require("express"); 

const adminRouter = express.Router();

const { authenticateAdmin} = require("../middlewares/admin");

const {authenticateUser} = require("../middlewares/user");

const {runPoolQuery} = require("../models/db");


adminRouter.get("/orders", authenticateUser ,authenticateAdmin,async (req, res) => {
    
    const query = `
        SELECT
            * 
        FROM 
         orders;  
    `
    try {
        const result = await runPoolQuery(query);
        res.status(201).send({
            allProducts: result
        })
    }catch(err) {
        res.status(500).send({
            message: "Interval server error",
            Error: err
        })
    }

    
})


adminRouter.put("/orders/:id/status", authenticateUser, authenticateAdmin, async (req, res) => {
    const orderId = req.params.id;
    const {status} = req.body;


    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

    if(!validStatuses.includes(status)){
        return res.status(400).send({
            message: "Invalid status value"
        })
    }
    const updateQuery = `
        UPDATE orders
            SET status = $1
        WHERE 
            id = $2
        RETURNING *;
    `;
    try {
        const values = [status, orderId];
        const result = await runPoolQuery(updateQuery, values);

        if (result.length === 0) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send({
            message: "Order status updated ",
            order: result[0]
        });
    } catch (err) {
        console.error("Error updating order status:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }


})



adminRouter.post("/add/product",async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    if (!name || !price || !description || !imageUrl) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const query = `
        INSERT INTO products (name, price, description, image_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [name, price, description, imageUrl];
    try {
        const result = await runPoolQuery(query, values);
        res.status(201).send({
            message: "Product added successfully",
            product: result[0]
        });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).send({ message: "Internal server error" });
    }

})

adminRouter.put("/products/:id", authenticateUser, authenticateAdmin, async (req, res) => {
    const productId = req.params.id;
    const { name, price, description, imageUrl } = req.body;

    if (!name || !price || !description || !imageUrl) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const query = `
        UPDATE products
        SET name = $1, price = $2, description = $3, image_url = $4
        WHERE id = $5
        RETURNING *;
    `;
    const values = [name, price, description, imageUrl, productId];

    try {
        const result = await runPoolQuery(query, values);
        if (result.length === 0) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send({
            message: "Product updated successfully",
            product: result[0]
        });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});


adminRouter.delete("/products/:id", authenticateUser, authenticateAdmin, async (req, res) => {
    const productId = req.params.id;

    const query = `
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
    `;
    const values = [productId];

    try {
        const result = await runPoolQuery(query, values);
        if (result.length === 0) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(200).send({
            message: "Product deleted successfully",
            product: result[0]
        });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});



module.exports = {
    adminRouter
}