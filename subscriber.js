"use strict";

const amqp = require("amqplib");
const queue = process.env.QUEUE || "first";

async function subscriber() {
  const open = await amqp.connect("amqp://localhost");
  const ch = await open.createChannel();

  await ch.assertQueue(queue);

  ch.consume(queue, (msg) => {
    console.log(msg.content.toString());
    ch.ack(msg);
  });
}

subscriber().catch((error) => {
  console.error(error);
  process.exit(1);
});
