const PostModel = require("../Models/post.model");
const UserModel = require("../Models/user.model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const newPost =async(req,res,next)=>{
    let {content,likes,user_id} = req.body;
     let existingUser;
     try {
        existingUser = await UserModel.findById(user_id)
     } catch (error) {
        console.log(error)
     }
     if(!existingUser){
        return res.status(400).json({message:"Unable to find the user by Id"})
     }
     const post = new PostModel({content,likes,user_id})
     try {
        await post.save();
     } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
     }
     return res.status(201).json({post})
}

 const singlePost =async(req,res,next)=>{
    const {id} = req.params;
    let existingPost;
    try {
        existingPost = await PostModel.findById({_id:id});
    } catch (error) {
        console.log(error)
    }
    if(!existingPost){
        return res.status(404).json({message:"Post not found!!!"})
    }
   return res.status(200).json({message:"Post found by its Id",existingPost});
 }

 
 const updatePost =async(req,res,next)=>{
    const {id} = req.params;
    const {content} = req.body; 
    let existingPost;
    try {
        existingPost = await PostModel.findByIdAndUpdate(id,{content},{new:true})
    } catch (error) {
        console.log(error)
    }
    if(!existingPost){
        return res.status(404).json({message:"Something went wrong"})
    }
       return res.status(200).json({message:"Update user Post",existingPost});
 }

 
 const deletePost =async(req,res,next)=>{
    const {id} = req.params;
    let existingPost;
    try {
        existingPost = await PostModel.findOneAndDelete({_id:id}); 
    } catch (error) {
        console.log(error)
    }
    if(!existingPost){
        return res.status(500).json({message:"Unable to delete"})
     }
     return res.status(204).json({message:"Successfully Deleted"})
 }

 
 const getLikePostById =async(req,res,next)=>{
    let {id} = req.params;
    let {likes} = req.body;
    let existingPost ;
    try {
        existingPost = await PostModel.findByIdAndUpdate(id,{likes},{new:true})
    } catch (error) {
     console.log(error)   
    }
    if(!existingPost){
        return res.status(404).json({message:"Something went wrong"})
    }
       return res.status(200).json({message:"Update Likes Post",existingPost});
 }

 
 const getUnLikePostById =async(req,res,next)=>{
    let {id} = req.params;
    let {likes} = req.body;
    let existingPost ;
    try {
        if(likes >= 0){
            existingPost = await PostModel.findByIdAndUpdate(id,{likes},{new:true})
        }
        else{
            return res.status(200).json({message:"Post have also minimum likes"})
        }
        } catch (error) {
     console.log(error)   
    }
    if(!existingPost){
        return res.status(404).json({message:"Something went wrong"})
    }
       return res.status(200).json({message:"Update unlikes Post",existingPost});
 }

  
 const allPostCount =async(req,res,next)=>{
    let allPost;
    try {
        allPost = await PostModel.find();
    } catch (error) {
        console.log(error)
    }
    if(!allPost){
        return res.status(400).json({message:"Post not found"});
    }
    return res.status(200).json({message:"All users",allPost});
 }

  
 const topFiveLikedPost =async(req,res,next)=>{

 }

 
 


module.exports = {
    newPost,singlePost,updatePost,deletePost,getLikePostById,getUnLikePostById,allPostCount,topFiveLikedPost
}

