const pool = require("../database/dbconnection")
const {service} = require("../sequelize/models")

let serviceRoutes = express.Router()


serviceRoutes.post('/api/create-service', (req,res, next)=>{
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


serviceRoutes.get('/api/get-service/:userid', async(req,res, next)=>{
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

serviceRoutes.get('/api/add-service-user/:userid/:serviceid', async(req,res, next)=>{
    try{
       pool.cQuery(`insert into user-service (user_id,service_id) values(${req.params.user_id},${req.params.service_id}`)

    }
    catch(e){
        console.log(e)
    }



    next()
})

serviceRoutes.get('/api/get-service', async(req,res, next)=>{
    try{
        var result = await service.findAll({

        })
        res.send(result)

    }
    catch(e){
        console.log(e)
    }



    next()
})


serviceRoutes.get('/api/get-user-service/:userid', async(req,res, next)=>{
    try{
        var result = await pool.cQuery(`select * from service-user left join service on service.service_id=service-user.service_id where service-user.user_id=${req.params.user_id}`)
        res.send(result)

    }
    catch(e){
        console.log(e)
    }



    next()
})


module.exports=serviceRoutes