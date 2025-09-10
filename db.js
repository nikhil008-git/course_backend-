const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; 

const userSchema = new Schema({
email : { type : String , required : true, unique : true},
password : { type : String , required : true},
firstname : { type : String , required : true},
lastname : { type : String , required : true}

});
 const adminSchema = new Schema ({
email : { type : String , required : true, unique : true},
password : { type : String , required : true},
firstname : { type : String , required : true},
lastname : { type : String , required : true}

})

const courseSchema = new Schema ({
   title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema ({
   userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports ={
  userModel,
  adminModel,
  courseModel,
  purchaseModel
}