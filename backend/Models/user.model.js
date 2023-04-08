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
        lowercase: true
    },
    bio:{
        type:String,
        maxlength:200
    },
    created_at: {
        type: Date,
        default: Date.now,
      },
    updated_at: {
        type: Date,
        default: Date.now,
      } 
})

const UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;