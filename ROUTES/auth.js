const express = require('express')
const auth= require('../middleware/is-auth')
const {check,body}=require('express-validator/check')
const feedsController =require('../CONTROLLER/FEED');
const usercontroller =require('../CONTROLLER/user');
const route  = express.Router();

route.put('/signup',[

body('email').isEmail().withMessage('please enter the valid mail'),
body('password').trim().isLength({min:5}),
body('name').trim().not().isEmpty()

], usercontroller.signup )

route.post('/login',usercontroller.login)



module.exports= route;