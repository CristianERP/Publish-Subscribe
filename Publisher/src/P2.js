const amqp = require('amqplib')

const exchange = "Beta"

const publish = async () => {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    await channel.assertExchange(exchange, 'fanout', {durable: false})

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
