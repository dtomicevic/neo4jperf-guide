---
title: Indexing
sidebar_label: Indexing
---


**Ahh, indexing!**

One of the most common pitfalls in database performance in general, Neo4j included, is regarding the usage of indexes. Let's see a few common issues. 

## Neo4j slow query performance issues

Look at this question from a few years ago at StackOverflow under the title ["Neo4j performance benchmarking"](https://stackoverflow.com/questions/16997328/neo4j-performance-benchmarking). 
If you read the issue, you will notice that the user is complaining about Neo4j performance. The user has one million nodes, and a simple search by ID for some node takes an infinite 31 seconds. Without watching what is happening, you can assume this is not a realistic performance for any database. 
This Neo4j poor performance probably means indexing is not working correctly. As it turns out, this Neo4j user didn't even set up the trigger, so the search is not very slow because it is brute forcing across the database. 

Here, take a look at this more recent query performance issue, ["Neo4j 3.5 Query performance Issue"](https://stackoverflow.com/questions/66270999/neo4j-3-5-query-performance-issue). Here the user has set up the index on the label `Application` and property `name`. But after running the Cypher query, Neo4j is consuming vast amounts of memory and taking quite some time.
Turn's out the user Cypher query is not considering the index that the user has created because the user did not use it in the Cypher query. 

## How to avoid Neo4j index performance issues? 

### 1. Index graph modeling

Before even considering setting the index up, think about how your data is modeled. Data modeling will help you 
understand the graph structure, which you can use to increase your query performance. Notice nodes and the properties. It would be best if you had an index on their properties on given nodes that you will often use for search. By introducing an index, you will gain extra performance for search because Neo4J will store your index in a special way, optimized for performance. 
Bare in mind that there will be few memory penalties. 

### 2. Setup the index

After importing the data, analyzing it, and executing any queries, ensure you have created the trigger. 
To create a trigger, you can use the query below: 

```CREATE INDEX index_name FOR (n:FooBar) ON (n.id)```

The Cypher query above will create the index on the node property. Make sure you have an index with some appropriate name. 

### 3. Use index in your query

The last part is to ensure your searches are optimized and your index is used in all Cypher queries from now on. In our example, every time we use a node `FooBar`, we should try to use the `id` property in the search. In your case, that will depend on the node and property your index is on. 




