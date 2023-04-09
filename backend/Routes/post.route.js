const express = require("express");
const { newPost,singlePost,updatePost,deletePost,getLikePostById,getUnLikePostById,allPostCount,topFiveLikedPost } = require("../Controller/post.controller");
const postRouter = express.Router();


postRouter.post("/posts",newPost);
postRouter.get("/posts/:id",singlePost);
postRouter.put("/posts/:id",updatePost);
postRouter.delete("/posts/:id",deletePost);
postRouter.post("/posts/:id/like",getLikePostById);
postRouter.post("/posts/:id/unlike",getUnLikePostById);
postRouter.get("/analytics/posts",allPostCount);
postRouter.get("/analytics/posts/top-liked",topFiveLikedPost);


module.exports = postRouter;