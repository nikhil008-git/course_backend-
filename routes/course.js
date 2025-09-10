const { Router } = require("express");
const {userMiddleware} = require("../middleware/auth");
const { purchaseModel, courseModel} = require("../db");
const courseRouter = Router();      


courseRouter.get("/purchase",userMiddleware, async (req, res) => {
    const userId = req.userId
    const { courseId } = req.body;

    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message : "you have successfully purchased the course"
    })
})

createRouter.get("/preview", userMiddleware, async function(req,res){

    const courses = await purchaseModel.find({

    })

    res.json({
        courses
    })
})
