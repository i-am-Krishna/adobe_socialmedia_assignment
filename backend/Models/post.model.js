const mongoose = require("mongoose");

const postSchema = mongoose.model({
    user_id:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
        maxlength:300,
    },
    created_at: {
        type: Date,
        default: Date.now,
      },
    updated_at: {
        type: Date,
        default: Date.now,
      },
      likes:{
        type:Number,
        required:true,
        default:0
      }
})