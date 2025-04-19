const express = require("express");

const userRouter = express.Router();

const jwt = require("jsonwebtoken");

const {z} = require("zod");


const {JWT_USER_SECRET} = require("../config");
console.log(JWT_USER_SECRET);

;const {insertUser} = require("../models/insertUsers");

const bcrypt = require("bcrypt");

const { runPoolQuery } = require("../models/db");

const { Query } = require("pg");


userRouter.post("/signup", async (req, res) => {


    const  requireBody = z.object({
      name: z.string().min(2).max(50),
      email: z.string().min(3).max(100).email(),
      password: z.string().min(5).max(100),
      isAdmin:z.boolean().optional()
    })
  
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success) {
      console.log(parsedDataWithSuccess.error.errors[0].message);
      res.send({
        errorMessage: parsedDataWithSuccess.error.errors[0].message
      })
      return;
    }
  
    const {name, email, password, isAdmin} = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const userDetails = {
        name, email, hashedPassword, isAdmin
      }
      const newUser = await insertUser({name: name, email: email, hashedPassword: hashedPassword, isAdmin: isAdmin});
      res.status(201).send({
        success: true,
        user: newUser
      })
  
  
    }
    catch(err) {
      res.status(500).send(
        { success: false, 
          message: "User not created" 
  
        });
    }
  
    
  })



userRouter.post("/signin", async (req, res)  => {
    const {email, password} = req.body;

    const findQuery = `
        SELECT 
        * 
        FROM 
            users
        WHERE 
            email = $1; 
    `
    const values =  [email];
    const user = await runPoolQuery(findQuery, values);
    console.log(user);
    if(user.length == 0) {
        res.send({
            message: "you're not signed up"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if(!passwordMatch) {
        res.status(401).send({
            message: "Invalid Credentials"
        })
        return;
    }
    const token = await jwt.sign(
        {id: user[0].id, isAdmin: user[0].is_admin}
    , JWT_USER_SECRET)
    res.send({
        message: "you logged succesfully",
        token: token,
        user: user[0]
    })
})

  module.exports = {
    userRouter: userRouter
  }