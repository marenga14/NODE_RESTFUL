const { ObjectId } = require('mongodb');
const mongoose =require('mongoose');

 const Schema=mongoose.Schema;

 const normalSchema= new Schema({
     name: {
         type:String,
         required:true,
     },
 
 email:{
     type:String,
     required:true,
    },

    password:{
        type:String,
        reqired:true,
    },
          
    Posts:[{
                type:Schema.Types.ObjectId,  
                ref:'housedetals',
                required:true
            }],
         
    Status:{
                type:String,
                default:"i am in"
                
            }

        }

     
     
     
 );

 
module.exports =mongoose.model('normalUser',normalSchema)