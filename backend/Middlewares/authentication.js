require("dotenv").config();
const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
    const token = req.headers?.authorization;
    try{
        let decoded = jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY);
        console.log(decoded)
        req.body.id = decoded.id;
        next();
    }
    catch(err){
       res.send("Please login again");
    }
}
module.exports = authentication;