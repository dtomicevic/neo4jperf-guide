---
title: Performance configuration
sidebar_label: Performance configuration
slug: /neo4j-performance-issue
---

Every database performance can depend on design, configuration, and the end hardware it runs on. 
If you ever run into the scaling bottleneck in your database, you know what I am talking about. 
Neo4j is a database written in Java, and it runs inside a JVM. From the start, you can assume that Neo4j won't be the most performant database on the market. 

## Neo4j performance issues

In order to put things in perspective, take a look at this issue from Stack Overflow: ["Neo4j Performance Challenge - How to Improve?"](https://stackoverflow.com/questions/29303841/neo4j-performance-challenge-how-to-improve). As you can see from the issue, the user has 12.5 million nodes and 64 million relationships.
The scale of this graph is big. Of course, there are always bigger graphs, but this is sufficient to get a sense of scale. User describes issue in the right manner, taking in consideration **graph schema**, **query profile**, **Neo4j properties**, **CPU**, **Memory**, **Disk** and some less relevant things. By looking at all these variables, you can see a lot of complexity there. 


## Tunning Neo4j performance issues 

In order to help fight common performance issues, here are a few tips and tricks on how to improve Neo4j performance.

### Understanding your Cypher query  

One of the common issues can come from not understanding your Cypher queries in detail. You can find where the performance issue is coming from by analyzing the query. Neo4j has a dedicated Cypher statement, `PROFILE`, that you can use for Cypher optimizations. Take a look at this example: 
```
PROFILE
MATCH (p)
RETURN p
```
As a result, you will get all details regarding the execution of this query, such as time, memory, DB hits, etc.
For more details, check out this [guide](https://neo4j.com/docs/cypher-manual/current/query-tuning/basic-example/). 

### Understanding your graph schema 

If you understand your graph schema and insides you what to extract from the database, you can see what essential nodes/relationships are. In order to boost database performance, you can use indexes and meaningful nodes/relationships to index them. This approach has pros and cons, but you can balance writing and reading speed, it is up to you to decide how to structure your graph. 


### Neo4j properties 

You can use a whole set of configuration properties to improve Neo4j performance. Since Neo4j has some memory settings related to JVM, you can look at [memory guide](memory.md). In the linked guide, you can find configurations that can help with performance. 
One interesting configuration property is also related to memory but it's Neo4j specific. It is called `pagecache`. Page cache defines the amount of memory cached in the RAM. The cache is used for important data such as indexes to avoid expensive disc access. You can set it up in neo4j.conf file like this: 

```
dbms.memory.pagecache.size=16GB
```
The page cache will improve write and read performance significantly. The downside here is that it is quite small for graph scale because of RAM limitations. The page cache will take 50% of available RAM if you do not configure it. 

For more details on performance tunning, take a look at Neo4j [guide](https://neo4j.com/developer/guide-performance-tuning/)