"use strict";

const amqp = require("amqplib");
const queue = process.env.QUEUE || "first";

async function publisher() {
  const open = await amqp.connect("amqp://localhost");
  const ch = await open.createChannel();

  await ch.assertQueue(queue);
  const send = await ch.sendToQueue(queue, Buffer.from("first queue"));
  console.log(send);
}

publisher().catch((error) => {
  console.error(error);
  process.exit(1);
});
