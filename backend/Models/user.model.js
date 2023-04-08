const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
        lowercase: true,
        uppercase:false
    },
    bio:{
        type:String,
        maxlength:200
    } 
},{
    timestamps:true
})

const UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;