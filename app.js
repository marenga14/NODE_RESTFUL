const express = require('express')
const app = express();
const path =require('path')
const bodyparser =require('body-parser')
const theRoutes =require('./ROUTES/route')

app.use(bodyparser.json())

app.use(theRoutes)

app.listen(8080)
