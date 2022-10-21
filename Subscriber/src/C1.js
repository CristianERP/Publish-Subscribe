const amqp = require('amqplib')

const queue = "queuez"
const exchange = "Alpha"

const subscribe = async () => {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()


    await channel.assertExchange(exchange, 'fanout', {durable: false})

    await channel.assertQueue(queue, {durable: false})

    await channel.bindQueue(queue, exchange)

    console.log("Esperando por mensajes en %s.", exchange);

    channel.consume(queue, message => {
        const content = JSON.parse(message.content.toString())
        console.log("Received %s", content);
    }, {
      noAck: true
  })
}

subscribe().catch( error => {
    console.error(error)
    process.exit(1)
})








// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var exchange = 'logs';

//         channel.assertExchange(exchange, 'fanout', {
//             durable: false
//         });

//         channel.assertQueue('', {
//             exclusive: true
//         }, function(error2, q) {
//             if (error2) {
//                 throw error2;
//             }
//             console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
//             channel.bindQueue(q.queue, exchange, '');

//             channel.consume(q.queue, function(msg) {
//                 if (msg.content) {
//                     console.log(" [x] %s", msg.content.toString());
//                 }
//             }, {
//                 noAck: true
//             });
//         });
//     });
// });


