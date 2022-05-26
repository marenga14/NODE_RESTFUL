const express = require('express')

const {check,body}=require('express-validator/check')
const feedsController =require('../CONTROLLER/FEED.JS');
const route  = express.Router();
route.post('/feeds', [
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5}
    )],feedsController.getFeeds);


route.get('/feedpos',feedsController.postFeeds)

route.get('/singlePost/:postId',feedsController.getsingleHouse);

route.delete('/deletePost/:postId',feedsController.deleteHouse);
route.put('/updateHouse/:postId',feedsController.updateHouse);

module.exports= route;