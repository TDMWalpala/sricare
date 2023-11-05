const {notification} = require("../../main server/sequelize/models");
const pool = require("../database/dbconnection");
const { sendMail } = require("./core/email");

class Notification{
    async sendMailNow(){
        try{
            sendMail('nimantha450@gmail.com')
        }
        catch(e){
            console.log(e)
        }
    }

    static async creaetNotification(user_id){
        var pay = await pool.cQuery(`select sum(service.payment) from service_user left join service on service.service_id=service_user.service_id where service_user.user_id=${user_id}`)
        pool.cQuery(`delete from notification where user_id=${user_id}`)
        try{
            notification.create({
                'payment':pay[0].sum,
                'title':"Bill detail",
                'status':'active',
                'description':"pay the bill now"
            })

        }
        catch(e){
            console.log(e)
        }
    }
}

module.exports=Notification