const {validationResult} =require( 'express-validator/check')
const user =require ('../MODELS/normalUser')
const path =require('path')
const bicrypt =require('bcryptjs')
const User =require('../MODELS/normalUser')
const bycrpt = require('bcryptjs')
const jwt =require('jsonwebtoken')



//signup user
exports.signup =(req,res,next)=>{
    const errors =validationResult(req);
if(!errors.isEmpty()){

    const error = new Error('invalid input');
    error.statusCode = 422
    error.data = errors.array();
    throw error

} 


const name =req.body.name;
const email =req.body.email;
const password =req.body.password;
 bycrpt
 .hash(password,12)
 .then(hashed=>{
    const user = new User({
        email:email,
        name:name,
        password:hashed
    });

   return user.save()
})
 .then(result =>{
    
    res.status(201).json({
        message:'user successfully created',
        userId: result._id

    })
})
.catch(err=>{
    console.log(err);
})
}

//login user

exports.login=(req,res,next)=>{
    

    const email = req.body.email;
    const password =req.body.passwors;
    User.findOne({email:email}).then(
        user=>{
            if(!user){
                const error = new Error("user not found")
                error.statusCode = 404;
                throw error
            }

          return  bicrypt.compare(password, user.password)

        }
    )
    .then(isEqual=>{
        if(!isEqual){
            const error =new Error("wrong password")
            error.statusCode =401;
            throw error
        }
        const token =jwt.sign({
            email:loaderUser.email,
            userId:loaderUser._id.toString()
            
        },'marengajuliusmtumbadisanakwakweli',{expiresIn:'1h'} )

    })
    .then(result=>{
        res.status(200).json({
            token:token
        })
    })
    .catch(err=>{
        console.log(err)
    })
}