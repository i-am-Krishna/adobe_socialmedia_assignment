const express = require("express");
const cors = require("cors");
const connection = require("./Db/db");
const userRouter = require("./Routes/user.route");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRouter);



app.get("/",(req,res)=>{
    res.send("<h1>Hello World...</h1>")
})


app.listen(port,async()=>{
    try {
        await connection;
        console.log('Mongo Db successfully runs')
    } catch (error) {
        console.log(error)
    }
    console.log(`Backend runs on ${port}`)
})