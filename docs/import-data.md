---
title: Import data
sidebar_label: Import data
slug: /neo4j-slow-import-data-performance
---

Executing wast amounts of transactions in a small time frame can be an interesting engineering challenge. One example of this activity is importing huge amounts of data into the Neo4j graph database. Importing data in the Neo4j graph database can come with some performance difficulties. Let's explore a few issues and how to handle them.


## Neo4j slow import data performance issue

To visualize the issues and problems users can face with importing some larger chunks of data, take a look at this older issue ["Neo4j import slowing down"](https://stackoverflow.com/questions/19386260/neo4j-import-slowing-down). If you carefully read these issues, you can notice that the user is trying to import 500 000 nodes via Cypher queries. He has prepared for import following usual steps. The initial Cypher queries take some 15ms, while later slowing to 6000ms. But the fun part is his response to the initial question. After running the Cypher query import for 24 hours, he decided to kill it. Then he ran the java import tool, and everything was imported in 11 seconds. Viola! 

This problem paints the picture of what you can run into while importing data in Neo4j database. 

## How to avoid Neo4j slow importing?

### Prerequisites for efficient import

To efficiently import data via Cypher/LOAD CSV, ensure that you have created appropriate unique property constraints. The unique constraint will implicitly create indexes for given properties. 
If you what to create the uniqueness constraint on properties, you can do it this way: 

```Cypher
CREATE CONSTRAINT foobar FOR (node:FooBar) REQUIRE node.id IS UNIQUE
```

This will ensure that, in this case, merging on node `id` property will be efficient, which can impact the duration time of import.  

### Importing via Cypher query

Importing via Cypher query can be quite simple and intuitive to try. Once the unique constraints and indexes are in place, you can execute the queries based on some CSV file. Here is the sample: 

```Cypher
LOAD CSV WITH HEADERS FROM "file:///foobar.csv" AS line
CREATE (node:FooBar {id: toInteger(line.id))
```

LOAD CSV will iterate over each CVS and execute the query for each CSV line. Each query transaction will be committed to the database. But don't skip the next two steps. There are more performance benefits to extract. 

## Fix Cypher query import

Executing Cypher queries line by line is a highway to hell if you have larger quantities of data. Running a Cypher query can slow down your performance because every Cypher query can become a single database transaction, which can bulk up the memory overhead. It would be best if you were careful with any Cypher query import on a large dataset.

But there is a way to improve it by using a special Cypher clause, `USING PERIODIC COMMIT`

```
USING PERIODIC COMMIT 500
LOAD CSV WITH HEADERS FROM "file:///foobar.csv" AS line
CREATE (node:FooBar {id: toInteger(line.id))
```

Using periodic commits, Neo4j will build up transactional data and make a smaller number of database commits, improving overall performance. But still, it will have performance issues with the load on big datasets. 

There is also an APOC library for importing with periodic commits, you can check it out [here](https://neo4j.com/labs/apoc/4.4/graph-updates/periodic-execution/)

## Admin import tool 

One more option and only one for loading big datasets is by using the Neo4j admin import tool. The import tool is made to work on batch imports on large datasets, but it is made for import on previously unused databases. If you have a running database, you can load via `LOAD CSV,` but that will be slow, which can be a deal breaker for some. 

Anyway, I hope this short guide helps. Feel free to search for more info on Neo4j docs about [Admin import tool](https://neo4j.com/docs/operations-manual/current/tools/neo4j-admin/neo4j-admin-import/)