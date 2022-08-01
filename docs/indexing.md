---
title: Indexing
sidebar_label: Indexing
slug: /neo4j-slow-query-performance-issue
---

Ahh, indexing! One of the most common pitfalls in database performance in general, Neo4j included, is the usage of indexes. At first, it may seem what I need an index for in the Graph database, but graphs can be stored as some other data structure in the background, this means you can index and optimize for storage data structure. The wrong usage of the index can make a database unusable, which can be quite painful. Let's see a few common issues with Neo4j database performance and indexes. 

## Neo4j slow query performance issues

Look at this question from a few years ago at StackOverflow under the title ["Neo4j performance benchmarking"](https://stackoverflow.com/questions/16997328/neo4j-performance-benchmarking). 
If you read the issue, you will notice that the user is complaining about Neo4j performance. The user has one million nodes, and a simple search by ID for some node takes an infinite 31 seconds. Without watching what is happening, you can assume this is not a realistic performance for any database. 
This Neo4j poor performance probably means indexing is not working correctly. As it turns out, this Neo4j user didn't even set up the trigger, so the search is not very slow because it is brute forcing across the database. 

Here, take a look at this more recent query performance issue, ["Neo4j 3.5 Query performance Issue"](https://stackoverflow.com/questions/66270999/neo4j-3-5-query-performance-issue). Here the user has set up the index on the label `Application` and property `name`. But after running the Cypher query, Neo4j is consuming vast amounts of memory and taking quite some time.
Turn's out the user Cypher query is not considering the index that the user has created because the user did not use it in the Cypher query. 

## How to avoid Neo4j index performance issues? 

### 1. Index graph modeling

Before even considering setting the index up, think about how your data is modeled. Data modeling will help you understand the graph structure, which you can use to increase your query performance.
Notice how nodes and their properties are modeled. It would be best if you had an index on the node properties, which you will often use for search. 
Bare in mind that there will be few memory storage penalties. 

### 2. Setup the index

After importing the data, understanding the graph structure, and executing any queries, ensure you have created the trigger. 
To create a trigger, you can use the query below: 

```cypher
CREATE INDEX index_name FOR (n:FooBar) ON (n.id)
```

The Cypher query above will create the index on the node property. Make sure you have an index with some appropriate name because you can check it out later. 

### 3. Use index in your query

The last part is to ensure your searches are optimized and your index is used in all Cypher queries from now on. In our example, every time we use a node `FooBar`, we should try to use the `id` property in the search. If we search `FooBar` node with some other property that is not indexed, we will not get any performance benefits. In your case, make sure that when you use the node that has an index, also use the property your index is on. 

### 4. Labels are indexed

One more thing to keep in mind, if the database has multiple nodes with different labels, let's assume that our nodes have labels `FooBar`, `Foo`, and `Bar`. Neo4j will automatically create the index for each of those labels, and you will be able to make somewhat performant queries. 

Neo4j has a lot of information in indexes. Feel free to jump to their official [docs](https://neo4j.com/docs/cypher-manual/current/indexes-for-search-performance/) for more information on indexes. 

