const {bill} = require("../sequelize/models")

let express= require("express")
const auth = require("../tokens/auth")
let billRoutes = express.Router()

//create bills
billRoutes.post('/api/create-bill',auth, (req,res, next)=>{
    try{
        bill.create({
            'user_id':req.body.user_id,
            'title':req.body.title,
            'payment':req.body.payment,
            'status':'pending'
        })

    }
    catch(e){
        console.log(e)
    }



    next()
})

//get bill by userid
billRoutes.get('/api/get-bill/:userid',auth, async(req,res, next)=>{
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



//when the amount is payed by user delete all the bills
billRoutes.get('/api/pay-bills/:userid', auth,async(req,res, next)=>{
    try{
        bill.destroy({
            where:{
                user_id:req.params.userid
            }
        })
      

    }
    catch(e){
        console.log(e)
    }



    next()
})

//updaet bill as payed
billRoutes.get('/api/set-bill/:serviceid', auth,async(req,res, next)=>{
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