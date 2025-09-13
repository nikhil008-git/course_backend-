const { Router } = require("express")
const{ adminModel , courseModel } =require("../db")
const jwt = require("jsonwebtoken")
const { adminSigninSchema, adminSgnupSchema } = require("../schema/admin")
const { z } = require("zod")
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin")
const bcrypt = require("bcrypt")
const { userSigninSchema } = require("../schema/user")

const adminRouter = Router();
adminRouter.post("/signup", async function(req, res) {
    const parsedData = adminSgnupSchema.safeParse(req.body);
    const { email, password, firstName, lastName } = parsedData.data; // TODO: adding zod validation
    // TODO: hash the password so plaintext pw is not stored in the DB

    // TODO: Put inside a try catch block
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName, 
        lastName: lastName
    })
    
    res.json({
        message: "Signup succeeded!"
    })
})

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    })
    if (admin){
        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
        res.json({
            message: "Signin succeeded",
            token: token
        })
    }
    else{
        res.status(401).json({
            message: "Invalid email or password"
        })
    }
})

adminRouter.post("/courses", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    
    const{ title , description, imageUrl, price }= req.body;
     const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })
     res.json({
        message: "Course created",
        courseId: course._id

    })
})

adminRouter.put("/courses", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const{ courseId, title, description, imageUrl, price } = req.body;  
      // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/courses/bulk", async function(req,res){
    const adminId = req.userId
    const courses = await courseModel.findOne({
        creatorId  : adminId
 
    })

    res.json({
        message : "All courses fetched successfully",   
        courses : courses
    })
})

module.exports = {
    adminRouter : adminRouter
}