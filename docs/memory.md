---
title: Out of memory exception
sidebar_label: Out of memory exception
slug: /neo4j-out-of-memory
---

Neo4j is built on top of bulky JVM, and with every JVM comes familiar out-of-memory exceptions. Since JVM has internal restrictions, running a database inside of JVM can lead to additional issues. 


## Neo4j out of memory issue

Out-of-memory issues and JVM are familiar, but let's see what the pain points with Neo4j are. If you search the internet, you will find vast amounts of memory-related issues. Take a look at this ["Neo4j delete graph out of memory"](https://stackoverflow.com/questions/44698936/neo4j-delete-graph-out-of-memory). This stack overflow user wants to delete all nodes and relationships, with 11 million of those. 
The user runs simple Cypher: 
```
MATCH (n) 
DETACH DELETE n
```
But after loading a while, there comes an `Out of memory` exception. This issue can be fixed quite quickly, we will show how, and in most cases, these issues are quite easy to fix but can be pretty frustrating. 

## How to fix out-of-memory issues? 

### Optimize your Cypher query

In quite a few cases, there are some query issues. You can use [Query tuning tool](performance-config.md) we mentioned in performance config. 
Out-of-memory issues are happening on some big workloads, and if your query is causing it, you can use `PERIODIC COMMIT` or APOC we mentioned in [writing speed guide](writing-speed.md). In short, running your queries in batches is less memory intensive than running them all in a single chunk. 


### Set your memory limits

Since Neo4j is running on top of JVM, there is a possibility to configure JVM memory settings. Neo4j have an `neo4j.conf` file for configuration, here is a [reference](https://neo4j.com/docs/operations-manual/current/reference/configuration-settings/) too all options. 
There are three options that you can use to handle memory issues: 

* `dbms.memory.heap.initial_size` 
* `dbms.memory.heap.max_size`
* `dbms.jvm.additional`

The Neo4j configuration parameter `dbms.memory.heap.initial_size` defines the initial reserved size of the memory heap available to Neo4j. If you do not set an exact value, the value is determined by JVM and available system resources. 

The next Neo4j configuration parameter `dbms.memory.heap.max_size` defines to upper limit on your Neo4j heap size. Again, if you do not set the value, it will be set by JVM explicitly. 

To set the parameters, you can write something like this: 

```
dbms.memory.heap.initial_size=8GB
dbms.memory.heap.max_size=16GB
```

There is one more parameter related to JVM, `dbms.jvm.additional` is used for setting additional options for the JVM, but keep in mind that it can depend on JVM implementations. 

Setting this argument can help you avoid memory issues, but bumping up the hardware specs will be the only option in some cases. There is also a useful Neo4j guide on [garbage collector](https://neo4j.com/docs/operations-manual/current/performance/gc-tuning/), that explains these arguments in more detail. 
