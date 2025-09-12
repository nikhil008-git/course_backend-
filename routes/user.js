const { Router } = require('express');
const { userModel, adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
const { userMiddleware } = require('../middleware/user');
const {  userSignupSchema, userSigninSchema } = require ("../schema/user");

const { z } = require('zod');
const { userSignupSchema } = require('../schema/user');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const parsedData = userSignupSchema.safeParse(req.body);
    const { email, password , firstname , lastname } = parsedData.data;    

    await userModel.create({
        email :email,
        password : password,
        firstname : firstname,
        lastname : lastname
    });

    res.json({
        message : "User created successfully"
    })

});
 userRouter.post('/signin', async (req, res) => {
    const parsedData = userSigninSchema.safeParse(req.body);
    const { email, password } = parsedData.data;

    const user = await userModel.findOne({
        email : email,  
        password : password
    })
 if(user){
    const token = jwt.sign({id : user._id }, JWT_USER_PASSWORD, );

    res.json({
        token:token     
    })
}else{
    res.status(401).json({  
        message : "Invalid email or password"
    })
}
});

userRouter.get('/purchases',userMiddleware, async (req, res) => {
    const userId = req.user._id;
    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter : userRouter
}