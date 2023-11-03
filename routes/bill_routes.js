const {bill} = require("../sequelize/models")

let billRoutes = express.Router()


billRoutes.post('/api/create-bill', (req,res, next)=>{
    try{
        service.create({
            'user_id':req.body.user_id,
            'title':req.body.title,
            'payment':req.body.payment,
            'description':req.body.description
        })

    }
    catch(e){
        console.log(e)
    }



    next()
})


billRoutes.get('/api/get-service/:userid', async(req,res, next)=>{
    try{
       var result = await bill.findAll({
            where:{
                user_id:req.params.userid,
                title:req.params.title,
                payment:req.params.payment,
                description:req.params.description,
                status:req.params.status
            }
        })
        res.send(result)

    }
    catch(e){
        console.log(e)
    }



    next()
})

billRoutes.get('/api/get-service', async(req,res, next)=>{
    try{
        var result = await bill.findAll({

        })
        res.send(result)

    }
    catch(e){
        console.log(e)
    }



    next()
})

billRoutes.get('/api/set-service/:serviceid', async(req,res, next)=>{
    try{
        var result = await bill.update({status:'paid'},
        {
            where:{
                service_id:req.params.service_id
            }
        }
        )
        res.send(result)

    }
    catch(e){
        console.log(e)
    }



    next()
})

module.exports=billRoutes