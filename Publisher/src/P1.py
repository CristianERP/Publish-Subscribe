import sys
from datetime import datetime
import json
import pika


connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
channel = connection.channel()

param_exchange = "Alpha" if len(sys.argv) == 1 else sys.argv[1]

# channel.queue_declare(queue=param_queue)
channel.exchange_declare(exchange=param_exchange, exchange_type="fanout")

msg = {"productor": "P1", "en": param_exchange, "timestamp": str(datetime.now())}
msg = json.dumps(msg)

channel.basic_publish(exchange=param_exchange, routing_key="", body=msg)

print("Sent ", msg)

connection.close()

# import pika
# import sys

# connection = pika.BlockingConnection(
#     pika.ConnectionParameters(host='localhost'))
# channel = connection.channel()

# channel.exchange_declare(exchange='logs', exchange_type='fanout')

# message = ' '.join(sys.argv[1:]) or "info: Hello World!"
# channel.basic_publish(exchange='logs', routing_key='', body=message)
# print(" [x] Sent %r" % message)
# connection.close()
