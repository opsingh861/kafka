const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9092']  // Change if your Kafka runs elsewhere
});

const producer = kafka.producer();

const run = async () => {
    await producer.connect();
    console.log('Producer connected');


    setInterval(async () => {

        await producer.send({
            topic: 'test-topic',
            messages: [
                { key: 'user1', value: 'Message A' },
                { key: 'user2', value: 'Message B' },
                { key: 'user3', value: 'Message C' },
                { key: 'user4', value: 'Message D' },

            ]
        });

    }, 3000);

    console.log('Message sent');
    // await producer.disconnect();
};

run().catch(console.error);
