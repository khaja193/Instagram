const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 12;

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})

userSchema.pre('save',function(next){   
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
    
                user.password = hash;
                next();
            
            })
        })
    }
    
})

mongoose.model("User",userSchema);

