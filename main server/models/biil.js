var amqp = require('amqplib/callback_api');
class Bill{

    static async sendMail(email, text, service){
    
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'mainp';
                const obj = {email: email, text:text};
                var msg = JSON.stringify(obj)
                if(service == 'roaming'){
                    console.log("----------------------------------------=================")
                    channel.assertExchange(exchange, 'direct', {
                        durable: true
                    });
                    channel.assertQueue('email', {
                        durable: true
                    });
                    channel.bindQueue('email', exchange, 'emailbill');
                    channel.publish(exchange, 'emailbill', Buffer.from(msg));
                    
                }
            });


        });
        



    }
       static async tsendMail(email, text, service){
    
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'maine';
                const obj = {email: email, text:text};
                var msg = JSON.stringify(obj)
                if(service == 'roaming'){
                    console.log("----------------------------------------=================")
                    channel.assertExchange(exchange, 'direct', {
                        durable: true
                    });
                    channel.assertQueue('push', {
                        durable: true
                    });
                    channel.bindQueue('push', exchange, 'pushbill');
                    channel.publish(exchange, 'pushbill', Buffer.from("hello"));
                    
                }
            });


        });
        



    }

    static async esendMail(email, text, service){
    
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'mainc';
                const obj = {email: email, text:text};
                var msg = JSON.stringify(obj)
                if(service == 'roaming'){
                    console.log("----------------------------------------=================")
                    channel.assertExchange(exchange, 'direct', {
                        durable: true
                    });
                    channel.assertQueue('data', {
                        durable: true
                    });
                    channel.bindQueue('data', exchange, 'pushbill');
                    channel.publish(exchange, 'emailbill', Buffer.from("hello"));
                    
                }
            });


        });
        



    }






}

module.exports=Bill