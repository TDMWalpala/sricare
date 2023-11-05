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
}

module.exports=Notification