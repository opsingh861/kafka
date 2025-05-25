const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'consumer1',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
    await consumer.connect();
    console.log('Consumer connected');

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const key = message.key ? message.key.toString() : null;
            const value = message.value ? message.value.toString() : null;
            console.log(`Consumed message | topic: ${topic} | partition: ${partition} | key: ${key} | value: ${value}`);
        }

    });
};

run().catch(console.error);
