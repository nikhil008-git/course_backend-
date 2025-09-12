const { z } = require('zod');
const admin = require('../routes/admin');

const adminSgnupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})
const adminSigninSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})  
module.exports = {
    adminSgnupSchema,
    adminSigninSchema
}