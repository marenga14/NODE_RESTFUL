const express = require('express')
const isAuth =require('../middleware/is-auth')

const {check,body}=require('express-validator/check')
const feedsController =require('../CONTROLLER/FEED.JS');
const route  = express.Router();
route.post('/feeds', [
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5}
    )],isAuth,feedsController.getFeeds);


route.get('/feedpos',isAuth, feedsController.postFeeds)

route.get('/singlePost/:postId',isAuth,feedsController.getsingleHouse);

route.delete('/deletePost/:postId',isAuth,feedsController.deleteHouse);
route.put('/updateHouse/:postId',isAuth,feedsController.updateHouse);

module.exports= route;