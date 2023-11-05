
/*--------------------------main api page---------------------------------*/
//libraries
let express= require("express")
let app = express();
let cookieParser = require('cookie-parser');
let path = require("path");
let cors = require("cors");
let bodyParser = require('body-parser');
let dotenv = require("dotenv");
let  {verify} = require('jsonwebtoken');
const notiRoutes = require("../routes/notification");
var amqp = require('amqplib/callback_api');
const Notification = require("../models/notification");


dotenv.config()

/* ************
/**middleware********* */
//cookie handlding
app.use(cookieParser());


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))//url encoded bodies)
app.use(bodyParser.json())
app.use(express.static('public'))

//all routes
app.use(notiRoutes)


async function connectRabbitMQ() {
  
    amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
        throw error1;
        }
        var exchange = 'mainc';

        channel.assertExchange(exchange, 'direct', {
            durable: true
        });

        console.log(' [*] Waiting for logs. To exit press CTRL+C');

            channel.assertQueue('push', {
                        durable: true
            });
        
            channel.bindQueue('push', exchange, 'pushbill');
   ;
      

        channel.consume('push', function(msg) {
            console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            var obj = msg.content.toString();
            obj=JSON.parse(obj);
            Notification.creaetNotification(obj.user_id)
            
        }, {
            noAck: true
        });
      
      
    });
    });
}

connectRabbitMQ();




