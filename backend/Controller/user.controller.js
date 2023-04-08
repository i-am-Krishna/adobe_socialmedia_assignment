const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const newUser = async(req,res,next)=>{
    let {name,email,bio} = req.body;
    let existingUser;
    try {
         existingUser = await UserModel.findOne({email});
    } catch (error) {
        console.log(error)
    }
    if(existingUser){
        const token = jwt.sign({email:existingUser.email},process.env.ACCESS_TOKEN_PRIVATE_KEY,{
            expiresIn:"7d"
        })
        return res.status(200).json({message:"Login Successful",user:existingUser,token})
    }

    const newUser = new UserModel({
        name,email,bio
    });
    try {
        await newUser.save()
    } catch (error) {
        return console.log(error)
    }

    
    const token = jwt.sign({email},process.env.ACCESS_TOKEN_PRIVATE_KEY,{
        expiresIn:"7d"
    }) 
    return res.status(201).json({message:"Register successful",newUser,token});

}

const singleUser = ()=>{

}

const updateUser = ()=>{

}

const deleteUser = ()=>{

}

const getAllUsers = ()=>{

}

const topFiveActiveUsers =()=>{

}
 

module.exports = {
    newUser,singleUser,updateUser,deleteUser,getAllUsers,topFiveActiveUsers
}

