const pool = require("../database/dbconnection")
const {service} = require("../sequelize/models")
const express = require('express')
const auth = require("../tokens/auth")
const {notification} = require("../sequelize/models")
let notiRoutes = express.Router()

//create notification
serviceRoutes.post('/api/create-notification',auth ,(req,res, next)=>{
    try{
        service.create({
            'type':req.body.type,
            'payment':req.body.payment,
            'title':req.body.title,
            'status':'active'
        })

    }
    catch(e){
        console.log(e)
    }



    next()
})

//get all the notifcation related to user
serviceRoutes.post('/api/get-notification/:userid',auth ,async(req,res, next)=>{
    try{
        var result =  await notification.findAll({
            where:{
                'status':'active'
            }
        })
        
        res.send(result)

    }
    catch(e){
        console.log(e)
    }



    next()
})