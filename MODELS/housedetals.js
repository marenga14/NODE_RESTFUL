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

    
// price:{
//   type:Number,
//   required:true
// },

creator:{
  type:Schema.Types.ObjectId, 
  required:true,
  ref: 'normalUser',
},


   
}, {timestamps:true})

module.exports =mongoose.model('housedetals',addHouse)