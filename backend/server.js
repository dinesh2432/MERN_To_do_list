const express = require('express')
const app=express()
const path = require('path')
const PORT =process.env.PORT || 3500
const router=require('./routes/routes.js')
const cors =require('cors')

//build in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


//connect to db
require('./models/db.js') 

//middleware
app.use("/",router)




//listen to port
app.listen(PORT,()=>{
    console.log("Server running on port 3500")
})