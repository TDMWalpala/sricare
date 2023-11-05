var amqp = require('amqplib/callback_api');
class Bill{

    static async sendMail(email, text, payment){
    
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'mainp';
                const obj = {email: email, text:text,payment:payment};
                var msg = JSON.stringify(obj)
             
                    channel.assertExchange(exchange, 'direct', {
                        durable: true
                    });
                    channel.assertQueue('email', {
                        durable: true
                    });
                    channel.bindQueue('email', exchange, 'emailbill');
                    channel.publish(exchange, 'emailbill', Buffer.from(msg));
                    
                
            });


        });
        



    }
       static async sendNotification(userid){
    
        amqp.connect('amqp://localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'maine';
                const obj = {user_id: userid};
                var msg = JSON.stringify(obj)
                
                    channel.assertExchange(exchange, 'direct', {
                        durable: true
                    });
                    channel.assertQueue('push', {
                        durable: true
                    });
                    channel.bindQueue('push', exchange, 'pushbill');
                    channel.publish(exchange, 'pushbill', Buffer.from(msg));
                    
                
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



    static async scheduleMonthlyTask() {
        // Get the current date
        const currentDate = new Date();
        
        // Calculate the number of milliseconds until the next month
        const currentMonth = currentDate.getMonth();
        const nextMonth = (currentMonth + 1) % 12; // Calculate next month (0-11)
        
        // Set the target month and year
        const targetMonth = nextMonth;
        const targetYear = currentDate.getFullYear() + (nextMonth === 0 ? 1 : 0); // If next month is January, increment the year
        
        // Set the target date to the 1st day of the next month
        const targetDate = new Date(targetYear, targetMonth, 1);
        
        // Calculate the time difference in milliseconds between the current date and the target date
        const timeUntilNextMonth = targetDate - currentDate;
        
        // Schedule the function to run once a month
        setTimeout(function() {
            // Execute the function
         
            
            // Schedule the function to run again next month
            Bill.scheduleMonthlyTask();
        }, timeUntilNextMonth);
    }









}

module.exports=Bill