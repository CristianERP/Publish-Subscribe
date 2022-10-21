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
