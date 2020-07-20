const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET_CODE} = require('../keys');
const User = mongoose.model("User");
const loginMiddleware = require('../middleware/loginMiddleware');

router.get('/',(req,res)=>{
    res.send("router auth");
})

router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;

    if(!name||!email||!password)
    {
        res.status(422).json({error:"please add all the fields"});
    }

    let user = new User({name,email,password});
    user.save().then((user)=>{
      
        res.json({
            message:"successfully added to database",
            user
        })
    })
    .catch(err=>{
        if(err.code==11000)
        {
            res.json({
                message:"Duplicate Entry"
            })
        }
        res.send(err);
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;

    if(!email||!password)
    {
        res.json({
            message:"please add all the fields"
        })
    }

    User.findOne({email:email})
    .then(user=>{
        if(!user){
           return res.status(422).json({
                error:"user not found"
            })
        }

        bcrypt.compare(password,user.password)
        .then(isMatched=>{
            if(isMatched){
                const token = jwt.sign({_id:user._id},SECRET_CODE)
                return res.json({
                    message:"successfully signed in",
                    token:token
                })
            }
            res.status(422).json({
                error:"Invalid email or password"
            })
        })
    })
})

router.get('/protected',loginMiddleware,(req,res)=>{
    res.send("entered into projected content after checking token")
})

module.exports = router;