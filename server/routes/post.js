const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {Post} = require('../models/post');


const loginMiddleware = require('../middleware/loginMiddleware');


router.get('/myPosts',loginMiddleware,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myPosts=>{
        res.json({myPosts})
        
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/allPosts',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/createPost',loginMiddleware,(req,res)=>{
    const {title,body} = req.body;
    //console.log(req.body)
    if(!title||!body){
        return res.status(422).json({
            error:"Please add all the fields"
        })
    }

    req.user.password = undefined;
    const post = new Post({title,body,postedBy:req.user});

    post.save()
    .then(postedData=>{
        res.json({post:postedData})
    })
    .catch(err=>{
        console.log(err);
    })
})


module.exports = router;