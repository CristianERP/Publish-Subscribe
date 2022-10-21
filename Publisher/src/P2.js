const amqp = require('amqplib')

const exchange = "Beta"

const publish = async () => {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    await channel.assertExchange(exchange, 'fanout', {durable: false})
    //await channel.assertQueue(queue)

    const msg = {
        "productor": "P2",
        "en": exchange,
        "timestamp": Date()
    }


    const sent = await channel.publish(
        exchange,
        '',
        Buffer.from(JSON.stringify(msg))
    )

    sent ? console.log('Sent ', msg): console.log('Fail') 
}

publish().catch( error => {
    console.error(error)
    process.exit(1)
})

setTimeout(() => process.exit(0), 2000)


// var amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var exchange = 'logs';
//         var msg = process.argv.slice(2).join(' ') || 'Hello World!';

//         channel.assertExchange(exchange, 'fanout', {
//             durable: false
//         });
//         channel.publish(exchange, '', Buffer.from(msg));
//         console.log(" [x] Sent %s", msg);
//     });

//     setTimeout(function() {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });