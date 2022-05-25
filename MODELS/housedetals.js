const express =require('express');
const mongoose =require('mongoose');

const schema  =mongoose.Schema();

const Schema=mongoose.Schema;



const addHouse =new Schema({
   title:{
       type:String,
       reqired:true,
   },
   
   imageUrl:{
  type:String,
  required:true,
},

content:{
  type:String,
  required:true,
},
 creator:{
     type:Object,
     require:String
 }
    
// price:{
//   type:Number,
//   required:true
// },

// userId:{
//   type: mongoose.Schema.Types.ObjectId, 
//   required:true,
//   ref: 'normalUser',
// },


   
}, {timestamps:true})

module.exports =mongoose.model('housedetail',addHouse)