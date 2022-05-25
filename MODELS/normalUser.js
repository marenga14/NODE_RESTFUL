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

    pass:{
        type:String,
        reqired:true,
    },
          
    Posts:[{
                type:Schema.Types.ObjectId,  
                ref:'housedetail',
                required:true
            }],
         
    Status:{
                type:String,
                required:true
                
            }

        }

     
     
     
 );