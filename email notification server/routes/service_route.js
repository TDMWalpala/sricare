const pool = require("../database/dbconnection")
const {service} = require("../sequelize/models")
const express = require('express')
const auth = require("../tokens/auth")
const Bill = require("../../main server/models/biil")
let serviceRoutes = express.Router()

//create new service
serviceRoutes.post('/api/create-service',auth ,(req,res, next)=>{
    try{
        service.create({
            'type':req.body.type,
            'payment':req.body.payment,
            'title':req.body.title
        })

    }
    catch(e){
        console.log(e)
    }



    next()
})


///get all the services by user
serviceRoutes.get('/api/get-service',auth, async(req,res, next)=>{
    try{
       var result = await service.findAll({
            where:{

            }
        })
        res.send(result)

    }
    catch(e){
        console.log(e)
    }



    next()
})

serviceRoutes.get('/api/add-service-user/:userid/:serviceid',auth, async(req,res, next)=>{
    try{
        console.log(`insert into service_user(user_id,service_id) values(${req.params.userid},${req.params.serviceid})`);
       var result =  await pool.cQuery(`insert into service_user(user_id,service_id) values(${req.params.userid},${req.params.serviceid})`)
       var user = await pool.cQuery(`select * from application_user where user_id=${req.params.userid}`)
       var service = await pool.cQuery(`select * from service where service_id=${req.params.serviceid}`)
        Bill.sendMail(user.email,service.title)
       if(result==0){
        res.send([])
       }
       else{
           res.send(result)

       }

    }
    catch(e){
        console.log(e)
    }



    next()
})




serviceRoutes.get('/api/get-user-service/:userid',auth, async(req,res, next)=>{
    try{
        var result = await pool.cQuery(`select * from service_user left join service on service.service_id=service_user.service_id where service_user.user_id=${req.params.userid}`)
        if(result==0){
            res.send([])
        }
        else{
            res.send(result)

        }

    }
    catch(e){
        console.log(e)
    }



    next()
})


module.exports=serviceRoutes