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
        const token = jwt.sign({email:existingUser.email,id:existingUser._id.toString()},process.env.ACCESS_TOKEN_PRIVATE_KEY,{
            expiresIn:"7d"
        })
        return res.status(200).json({message:"Login Successful",user:existingUser,token})
    }

    const newUserRegister = new UserModel({
        name,email,bio
    });
    try {
        await newUserRegister.save()
    } catch (error) {
        return console.log(error)
    }

    const token = jwt.sign({email,id:newUserRegister._id.toString()},process.env.ACCESS_TOKEN_PRIVATE_KEY,{
        expiresIn:"7d"
    }) 
    return res.status(201).json({message:"Register successful",newUserRegister,token});
}

const singleUser = async(req,res,next)=>{
    const {id} = req.params;
    let existingUser;
    try {
        existingUser = await UserModel.findById({_id:id});
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(404).json({message:"User not found!!!"})
    }
   return res.status(200).json({message:"User Credentials",existingUser});
}

const updateUser = async(req,res,next)=>{
    const {id} = req.params;
    const {name,bio} = req.body; 
    let existingUser;
    try {
        existingUser = await UserModel.findByIdAndUpdate(id,{name,bio},{new:true})
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(404).json({message:"Something went wrong"})
    }
       return res.status(200).json({message:"Update user credentials",existingUser});
}


const deleteUser = async(req,res,next)=>{
    const {id} = req.params;
    let existingUser;
    try {
        existingUser = await UserModel.findOneAndDelete({_id:id}); 
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(500).json({message:"Unable to delete"})
     }
     return res.status(204).json({message:"Successfully Deleted"})
}

const getAllUsers = async(req,res,next)=>{
    let allUsers;
    try {
        allUsers = await UserModel.find().count();
    } catch (error) {
        console.log(error)
    }
    if(!allUsers){
        return res.status(400).json({message:"Users not found"});
    }
    return res.status(200).json({message:"All users",allUsers});
}

const topFiveActiveUsers =()=>{ 

}
 

module.exports = {
    newUser,singleUser,updateUser,deleteUser,getAllUsers,topFiveActiveUsers
}

