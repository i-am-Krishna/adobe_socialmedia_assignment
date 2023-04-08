const express = require("express");
const cors = require("cors");


const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Hello World...</h1>")
})


app.listen(port,()=>{
    console.log(`Backend runs on ${port}`)
})