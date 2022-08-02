"use strict";(self.webpackChunkneo_4_jperf_guide=self.webpackChunkneo_4_jperf_guide||[]).push([[206],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(r),m=a,h=d["".concat(c,".").concat(m)]||d[m]||u[m]||o;return r?n.createElement(h,i(i({ref:t},l),{},{components:r})):n.createElement(h,i({ref:t},l))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5688:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={title:"Write speed",sidebar_label:"Write speed",slug:"/neo4j-slow-write-performance"},i=void 0,s={unversionedId:"write-speed",id:"write-speed",title:"Write speed",description:"Fast reads are essential for every database. Once the database gets huge, it needs to perform very fast. But with huge amounts of data in the database, write speed can become an issue. The rising need for better write speed comes from the increased load on every database system and strive for better efficiency.",source:"@site/docs/write-speed.md",sourceDirName:".",slug:"/neo4j-slow-write-performance",permalink:"/neo4j-slow-write-performance",draft:!1,tags:[],version:"current",frontMatter:{title:"Write speed",sidebar_label:"Write speed",slug:"/neo4j-slow-write-performance"},sidebar:"neo4jperf_guide",previous:{title:"Indexing",permalink:"/neo4j-slow-query-performance-issue"},next:{title:"Out of memory exception",permalink:"/neo4j-out-of-memory"}},c={},p=[{value:"Neo4j slow write performance",id:"neo4j-slow-write-performance",level:2},{value:"Optimize Neo4j write performance",id:"optimize-neo4j-write-performance",level:2},{value:"Check index and unique constraints",id:"check-index-and-unique-constraints",level:3},{value:"Baches of transactions",id:"baches-of-transactions",level:3}],l={toc:p};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Fast reads are essential for every database. Once the database gets huge, it needs to perform very fast. But with huge amounts of data in the database, write speed can become an issue. The rising need for better write speed comes from the increased load on every database system and strive for better efficiency. "),(0,a.kt)("h2",{id:"neo4j-slow-write-performance"},"Neo4j slow write performance"),(0,a.kt)("p",null,"Neo4j database can have an issue with write performance. Take a look at this issue users have reported ",(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/40870057/neo4j-outrageous-write-performance"},'"Neo4j outrageous write performance"'),". If you read an issue, you can notice that the user has tried several approaches to combat slow write performance. First with a bulk of synchronous 1000 queries and transactions, then with one transaction and 1000 queries, and last 1000 async transactions with one query,  all on ten thread machine. All options for 1000 transactions are in the time range of second, which is not great. Some approaches and comments from this issue are great, but let's make a summary that can help you maximize Neo4j write performance. "),(0,a.kt)("h2",{id:"optimize-neo4j-write-performance"},"Optimize Neo4j write performance"),(0,a.kt)("h3",{id:"check-index-and-unique-constraints"},"Check index and unique constraints"),(0,a.kt)("p",null,"Indexing your data can make a huge difference when searching or traversing the graph. At the same time, any index you create can negatively impact write speed, because it adds additional load to the database engine. The same argument is valid for node labels and unique constraints. Each label and unique constraint is an index.\nIn order to improve your write speed performance, check your indexes, labels, and unique constraints. If you have unnecessary indexes, evaluate whether you can reduce them to improve write speed performance. Of course, there are possible penalties for reading speed performance, but it is a balancing act. "),(0,a.kt)("h3",{id:"baches-of-transactions"},"Baches of transactions"),(0,a.kt)("p",null,"Neo4j stores each transaction step in memory. If anything fails, it can roll back all the changes that caused the issue. This is primarily because it is an ACID-compliant database.\nThe more transactions there are, they all store in the JVM memory heap, which can cause out-of-memory exceptions and crash the server. To avoid out-of-memory issues, try to use baches with ",(0,a.kt)("inlineCode",{parentName:"p"},"PERIODIC COMMIT")," Cypher statement. Cypher statement will ensure that running the transaction contains a defined number of  Cypher statements.  "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"USING PERIODIC COMMIT 1000\nLOAD CSV ...\nMATCH ...\nMERGE ...\nCREATE ...\n")),(0,a.kt)("p",null,"The Cypher above will take 1000 statements, wrap them in a single transaction, and repeat that for every 1000 statements. Cypher will reduce the size of transactions and updates within the transaction. "),(0,a.kt)("p",null,"The same functionally can be accomplished by using ",(0,a.kt)("a",{parentName:"p",href:"https://neo4j.com/developer/neo4j-apoc/"},"APOC"),". APOC stands for Awesome Procedures on Cypher. APOC enables you to specify parameters for running in batches. Take a look at the example below.  "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'CALL apoc.periodic.iterate(\n  "MATCH ...",\n  "MERGE ...",\n  "CREATE ..."\n  {batchSize:1000, parallel:true})\n')),(0,a.kt)("p",null,"Running your Cypher like this will run batch size of 1000 statements, and they will run in parallel.\nThe important note here is the size of your updates should determine that batch size. If you updated 10k nodes, it should be fine to have a batch of 1000, but if you have 1M updates, you can go with 50k commands per transaction. Be careful that your hardware RAM and memory configuration can handle these large batches.   "),(0,a.kt)("p",null,"The Cypher for statements in batches is recommended for imports. Import is just writing to the database, and running the statements in batches can improve import performance. More information on ",(0,a.kt)("a",{parentName:"p",href:"/neo4j-slow-import-data-performance"},"import guide")),(0,a.kt)("p",null,"If you still experience write issues taka a look at the ",(0,a.kt)("a",{parentName:"p",href:"/neo4j-out-of-memory"},"memory")," and ",(0,a.kt)("a",{parentName:"p",href:"/neo4j-performance-issue"},"performance-config")," guides."))}u.isMDXComponent=!0}}]);