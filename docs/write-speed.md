---
title: Write speed 
sidebar_label: Write speed
slug: /neo4j-slow-write-performance
---

Fast reads are essential for every database. Once the database gets huge, it needs to perform very fast. But with huge amounts of data in the database, write speed can become an issue. The rising need for better write speed comes from the increased load on every database system and strive for better efficiency. 

## Neo4j slow write performance 

Neo4j database can have an issue with write performance. Take a look at this issue user have reported ["Neo4j outrageous write performance"](https://stackoverflow.com/questions/40870057/neo4j-outrageous-write-performance). If you read an issue, you can notice that the user has tried several approaches to combat slow write performance. First with a bulk of synchronous 1000 queries and transactions, then with one transaction and 1000 queries, and last 1000 async transactions with one query,  all on ten thread machine. All options for 1000 transactions are in the time range of second, which is not great. Some approaches and comments from this issue are great, but let's make a summary that can help you maximize Neo4j write performance. 

## Optimize Neo4j write performance


### Check index and unique constraints  

Indexing your data can make a huge difference when searching or traversing the graph. At the same time, any index you create can negatively impact write speed, because it adds additional load to the database engine. The same argument is valid for node labels and unique constraints. Each label and unique constraint is an index. 
In order to improve your write speed performance, check your indexes, labels, and unique constraints. If you have unnecessary indexes, evaluate whether you can reduce them to improve write speed performance. Of course, there are possible penalties for reading speed performance, but it is a balancing act. 


### Baches of transactions

Neo4j store each transaction step in memory. If anything fails, it can roll back all the changes that caused the issue. This is primarily because of being an ACID-compliant database.
The more transactions there are, they all store in the JVM memory heap, which can cause out-of-memory exceptions and crash the server. To avoid out-of-memory issues, try to use baches with `PERIODIC COMMIT` Cypher statement. Cypher statement will ensure that running the transaction contains a defined number of  Cypher statements.  

```
USING PERIODIC COMMIT 1000
LOAD CSV ...
MATCH ...
MERGE ...
CREATE ...
```

The Cypher above will take 1000 statements, wrap them in a single transaction, and repeat that for every 1000 statements. Cypher will reduce the size of transactions and updates within the transaction. 

The same functionally can be accomplished by using [APOC](https://neo4j.com/developer/neo4j-apoc/). APOC stands for Awesome Procedures on Cypher. APOC enables you to specify parameters for running in batches. Take a look at the example below.  

```
CALL apoc.periodic.iterate(
  "MATCH ...",
  "MERGE ...",
  "CREATE ..."
  {batchSize:1000, parallel:true})
```

Running your Cypher like this will run batch size of 1000 statements, and they will run in parallel. 
The important note here is the size of your updates should determine that batch size. If you updated 10k nodes, it should be fine to have a batch of 1000, but if you have 1M updates, you can go with 50k commands per transaction. Be careful that your hardware RAM and memory configuration can handle these large batches.   

The Cypher for statements in batches is recommended for imports. Import is just writing to the database, and running the statements in batches can improve import performance. More information on [import guide](/docs/import-data.md)

If you still experience write issues taka a look at the [memory](/docs/memory.md) and [performance-config](docs/performance-config.md) guides. 

