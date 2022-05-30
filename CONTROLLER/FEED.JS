const {validationResult} =require( 'express-validator/check')
const housedetail =require ('../MODELS/housedetals')
const path =require('path')
const auth =require('../middleware/is-auth')
const User = require('../MODELS/normalUser')

exports.getFeeds =(req,res,next)=>{

    const errors = validationResult(req);
if(!errors.isEmpty()){

    return res
           .status(422)
           .json({
               message:'Just got an incorrect inputs',
               errors:errors.array()
           })

}

     if(!req.file){
         console.log("no file")
     }


    const title =req.body.title;
    const content =req.body.content;
    const imageUrl = req.file.path;
    
     


    const house = new housedetail({
 
                    content:content,
                    title:title,
                    imageUrl:imageUrl,
                    creator:req.userId 
    })

    house.save()
    .then(result=>{
          let creator;
          return User.findById(req.userId)
           
           }).then(user=>{
            user.Posts.push(house)
            creator =user;
            return user.save();
           })
           .then( result=>{
            res.status(200).json({
                message:'sucessifull posted',
                post:house,
                creator:{_id:creator._id,creator: creator.name}
            })
    }).catch(err=>console.log(err))


    


}
exports.postFeeds=(req,res,next)=>{
let Currentpage = req.query.page || 1;
let totalItems;
let perPage= 2;
housedetail.find().countDocuments().then(
    count=>{
        totalItems=count;
        return housedetail.find()
        .skip((Currentpage-1)*perPage)
        .limit(perPage);
    }
).then(house=>{
     
    if(!house){
        console.log("no house in all")
    }

res.status(200).json({
    message:"fetched all succesfully",
    posts:house,
    totalItems:totalItems
})
 }
).catch(err=>{
    console.log(err);
})


 
 

}   




exports.getsingleHouse = (req,res,next)=>{

const houseId =req.params.postId;

housedetail.findById(houseId).then(house=>{
    if(!house){

        const error =new Error("No house found");
        error.statusCode=404;
        throw error;
    }
    
    res.status(200).json({
        message:"the house was fetched",
        post:house,



    })
}).catch(err=>{
    console.log(err)
})

}

exports.deleteHouse =(req, res,next)=>{
const houseId =req.params.postId;
housedetail
.findById(houseId)
.then(house=>{
    if(!house){

        const error =new Error("No house found");
        error.statusCode=404;
        throw error;
    }
       console.log(`${house.creator} and ${req.userId}`)
  
    if(house.creator._id.toString() !== req.userId)
    {

    const error = new Error('not authorised')
    error.statusCode=401;
    throw error
    
    }
    return house.deleteOne({_id:houseId})  
})
.then(result=>{
        return User.findById(req.userId)
}).then(user=>{
    console.log(user)
    user.Posts.pull(houseId)
    user.save();
    res.status(200).json({
        message:"Delete complete"
         })
   
})
.catch(err=>{
    console.log(err)
})

}



exports.updateHouse = (req,res,next) =>{
    const houseId = req.params.postId;
    const updatedTitle =req.body.title;
    const updatedContent =req.body.content;
    const updatedImageUrl=req.bod

    housedetail.findOne({_id:houseId,creator:req.userId})
    .then(house=>{

        if(!house){

            const error =new Error("No house found");
            error.statusCode=404;
            throw error;
        }
        house.title =updatedTitle;
        house.content= updatedContent;
        house.imageUrl =updatedImageUrl;

        return house.save();


    }).then(result=>{
        res.status(200).json({post:result,message:"updated"})
        console.log("house updated")
    }).catch(err=>{
        console.log(err);
    })
}