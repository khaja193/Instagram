const jwt = require('jsonwebtoken');
const {SECRET_CODE} = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error:"you are not logged in"})
        next();
    }

    const token = authorization.replace("Bearer ","");

    jwt.verify(token,SECRET_CODE,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"token mismatch"})
            next();
        }

        const {_id} = payload;
        //console.log(_id);
        User.findById(_id).then(user=>{
            req.user = user;
            next(); 
        })

        
    })
}