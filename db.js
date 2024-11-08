const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({

    email:{
        type:String,
        unique:true,        
    },
    password: String,

    firstname:String,

    lastname: String,


});

const adminSchema = new Schema({

    email:{
        type:String,
        unique:true,
    },
    password: String,

    firstname:String,

    lastname: String,

});

const courseSchema = new Schema({

    title: String,
    description: String,
    price: Number,  
    imgurl: String,
    creatorid: ObjectId,

});

const purchaseSchema = new Schema({

    userid: ObjectId,
    courseid: ObjectId
});

const UserModel = mongoose.model("users",userSchema)
const AdminModel = mongoose.model("admin",adminSchema)
const CourseModel = mongoose.model("courses",courseSchema)
const PurchaseModel = mongoose.model("purchases",purchaseSchema)

module.exports = {
    UserModel: UserModel,
    AdminModel:AdminModel,
    CourseModel:CourseModel,
    PurchaseModel:PurchaseModel

}