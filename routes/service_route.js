const pool = require("../database/dbconnection")
const {service} = require("../sequelize/models")
const express = require('express')
const auth = require("../tokens/auth")
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

serviceRoutes.get('/api/add-service-user/:userid/:serviceid', auth, async (req, res, next) => {
    try {
      const userId = req.params.userid;
      const serviceId = req.params.serviceid;
      
      // Modify the SQL query to set the status to 'activated'
      const query = `INSERT INTO service_user(user_id, service_id, status) VALUES(${userId}, ${serviceId}, 'activated')`;
      
      // Execute the modified query
      var result = await pool.cQuery(query);
  
      if (result == 0) {
        res.send([]);
      } else {
        res.send(result);
      }
    } catch (error) {
      console.log(error);
    }
    next();
  });
  




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


serviceRoutes.get('/api/get-deactivated-services/:userId', auth, async (req, res, next) => {
    try {
      const userId = req.params.userId;
      
      
      const deactivatedServices = await service.findAll({
        where: {
          status: 'deactivated',
        },
        include: {
          model: service_user,
          where: {
            userId: userId,
          },
        },
      });
  
      res.send(deactivatedServices);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    next();
  });
module.exports=serviceRoutes