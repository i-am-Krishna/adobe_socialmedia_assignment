const express = require("express");
const { newUser, singleUser, updateUser, deleteUser, getAllUsers, topFiveActiveUsers } = require("../Controller/user.controller");
const userRouter = express.Router();


userRouter.post("/users",newUser);
userRouter.get("/users/:id",singleUser);
userRouter.put("/users/:id",updateUser);
userRouter.delete("/users/:id",deleteUser);
userRouter.get("/analytics/users",getAllUsers);
userRouter.get("/analytics/users/top-active",topFiveActiveUsers);

module.exports = userRouter;