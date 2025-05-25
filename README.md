# Kafka Concepts and Exploration

This document captures key concepts, architecture components, and learnings related to Apache Kafka, along with comparisons to similar technologies and implementation practices.

## Contents

- Kafka vs RabbitMQ and Redis
- What is ZooKeeper?
- Kafka Key Concepts
- Kafka Consumer Groups and Partitions
- Kafka Message Replay
- Kafka Partition Reassignment
- Backpressure in Streaming Systems
- Using Redis with Kafka

---

## Kafka vs RabbitMQ and Redis

### Kafka
- Distributed event streaming platform.
- Optimized for high-throughput, durable, ordered, and replayable message streams.
- Stores data on disk and allows consumers to read at their own pace.
- Suitable for event-driven microservice architectures and data pipelines.

### RabbitMQ
- Message broker using AMQP protocol.
- Primarily queue-based system with ephemeral message delivery.
- Lacks built-in message replay functionality.
- Suitable for real-time task distribution and RPC.

### Redis (Streams)
- In-memory data store with stream capabilities.
- High performance with low latency.
- Limited durability compared to Kafka.
- Better suited for small-scale streaming or temporary queuing needs.

---

## What is ZooKeeper?

- ZooKeeper is a centralized service used by older Kafka versions to manage:
  - Broker metadata
  - Controller election
  - Topic configurations
- Modern Kafka (2.8+) supports a KRaft mode that removes the dependency on ZooKeeper.

---

## Kafka Key Concepts

### Broker
- A Kafka broker is a server that stores and serves topic data.
- A Kafka cluster is made of multiple brokers.
- Each broker handles read/write operations for assigned partitions.

### Topic
- A named stream of records.
- Topics are split into multiple partitions for scalability.

### Partition
- Ordered, immutable sequence of messages.
- Each message has an offset.
- Enables parallelism in consumption.

### Producer
- Sends messages to topics, optionally using keys for partitioning.

### Consumer
- Reads messages from a topic.
- Belongs to a consumer group for parallelism and scalability.

### Consumer Group
- Allows multiple consumers to share the load of processing a topic.
- Each partition is assigned to only one consumer within a group.

---

## Kafka Message Replay

Kafka supports message replay by design. Since data is persisted on disk, consumers can:

- Re-consume messages by resetting offsets.
- Replay messages using `seek()` API in Kafka clients.
- Use `kafka-consumer-groups` CLI to reset offsets to a specific point.

---

## Increase Number of Partitions

To increase partitions for an existing topic:

```bash
kafka-topics.sh --alter --topic <topic-name> --partitions <new-total> --bootstrap-server <broker>
