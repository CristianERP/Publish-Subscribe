import sys
import os
import pika


def main(param_exchange):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
    channel = connection.channel()

    channel.exchange_declare(exchange=param_exchange, exchange_type="fanout")

    result = channel.queue_declare(queue="", exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(exchange=param_exchange, queue=queue_name)

    def callback(ch, method, properties, body):
        print("Received %r" % body.decode())

    print(" Esperando mensajes en ", param_exchange)
    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    channel.start_consuming()


param_exchange = "Alpha" if len(sys.argv) == 1 else sys.argv[1]

if __name__ == "__main__":
    try:
        main(param_exchange)
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
