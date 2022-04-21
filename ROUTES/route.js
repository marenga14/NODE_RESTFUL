const express = require('express')
const feedsController =require('../CONTROLLER/FEED.JS')
const route  = express.Router()






route.get('/feeds',feedsController.getFeeds)

module.exports=route;