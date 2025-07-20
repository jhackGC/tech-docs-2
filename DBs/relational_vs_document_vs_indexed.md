---
title: Database Types Comparison - Relational vs Document vs Indexed
layout: clean
---

# Database Types: Relational vs Document vs Indexed

A comprehensive comparison of the three main database paradigms, their use cases, advantages, and when to choose each one.

## 📚 Table of Contents

- [🔥 The Fundamental Difference: SQL vs NoSQL](#-the-fundamental-difference-sql-vs-nosql)
- [Relational Databases](#relational-databases)
- [Document Databases](#document-databases)
- [Indexed/Search Databases](#indexed-search-databases)
- [Comparison Matrix](#comparison-matrix)
- [MongoDB vs PostgreSQL](#mongodb-vs-postgresql)
- [Decision Framework](#decision-framework)

---

## Relational Databases

Relational databases organize data into structured tables with predefined schemas and relationships between entities.

### When to Use Relational Databases

- **Multiple related entities**: When there are multiple different entities that are related
- **ACID compliance required**: When the DB has to be in a consistent state all the time
- **Database-level consistency**: When the DB should enforce the consistency (no matter from which app it is accessed)
- **Complex relationships**: e.g. entities are related to each other and when the parent entity is deleted all the inner entities should be deleted cascade
- **Structured data**: When data structure is well-defined and unlikely to change frequently
- **Complex queries**: Need for complex JOINs, aggregations, and analytical queries
- **Regulatory compliance**: Industries requiring strict data integrity (finance, healthcare)

### Advantages

- **ACID properties**: Atomicity, Consistency, Isolation, Durability
- **Data integrity**: Foreign keys, constraints, and normalization prevent data anomalies
- **Mature ecosystem**: Well-established tools, ORMs, and developer expertise
- **SQL standardization**: Universal query language across different vendors
- **Complex querying**: Advanced analytical capabilities with SQL

### Disadvantages

- **Schema rigidity**: Changes to schema can be expensive and complex
- **Scaling challenges**: Vertical scaling limitations, horizontal scaling complexity
- **Performance overhead**: JOIN operations can be expensive with large datasets
- **Object-relational impedance mismatch**: Difficulty mapping complex objects

### Examples

- PostgreSQL, MySQL, Oracle, SQL Server, MariaDB

---

## Document Databases

Document databases store data as flexible, JSON-like documents without requiring a predefined schema.

### When to Use Document Databases

- **Unstructured/semi-structured data**: e.g. items in a shop, user profiles, content management
- **High write performance is key**: Returning control to the writer ASAP (possibly sacrificing consistency, as it takes some time to be effectively applied/propagated)
- **Horizontal scaling**: As they don't have to maintain consistency at any given time, are good for scaling out to cluster-like systems, where the load can be distributed to a large number of hosts
- **Rapid development**: When schema flexibility is needed for fast iteration
- **Nested data structures**: When data naturally fits into document format
- **Single application access**: When one application primarily accesses the data

### When NOT to Use Document Databases

- **Highly structured data**: e.g. a tax system, accounting systems
- **Data integrity is key**: Has to be enforced at any given time at database level
- **Multiple applications**: Many DIFFERENT applications manipulate the data, and consistency has to be enforced at a database level
- **Complex relationships**: When data is highly normalized and requires complex joins
- **Strong consistency requirements**: When eventual consistency is not acceptable

### Advantages

- **Schema flexibility**: Easy to modify document structure without migrations
- **Natural object mapping**: Documents map well to programming language objects
- **Horizontal scaling**: Built for distributed architectures
- **High performance**: Fast reads and writes, especially for simple queries
- **Developer productivity**: Faster development cycles with flexible schema

### Disadvantages

- **Limited query capabilities**: No native support for complex joins
- **Data duplication**: Denormalization can lead to data inconsistency
- **Memory usage**: Can be higher due to document overhead
- **Learning curve**: Different mindset from relational database design

### Examples

- MongoDB, CouchDB, Amazon DocumentDB, Azure Cosmos DB

---

## Indexed/Search Databases

Indexed databases are optimized for fast search and retrieval operations, often used for full-text search and analytics.

### When to Use Indexed/Search Databases

- **Full-text search**: When you need powerful search capabilities across large text datasets
- **Real-time analytics**: For log analysis, metrics, and monitoring
- **Fast read performance**: When read speed is more important than write consistency
- **Faceted search**: E-commerce product search with filters
- **Time-series data**: Logging, monitoring, and event data
- **Content discovery**: Search engines, recommendation systems

### Advantages

- **Lightning-fast search**: Optimized for complex text searches and filtering
- **Real-time indexing**: Near real-time search capabilities
- **Scalability**: Excellent horizontal scaling for read-heavy workloads
- **Analytics**: Built-in aggregations and analytics capabilities
- **Relevance scoring**: Advanced ranking and relevance algorithms

### Disadvantages

- **Not ACID compliant**: Limited transactional capabilities
- **Write performance**: Indexing overhead can slow down writes
- **Storage overhead**: Indexes require additional storage space
- **Complexity**: Requires understanding of indexing and search concepts
- **Data consistency**: Eventually consistent, not suitable for critical transactional data

### Examples

- Elasticsearch, Apache Solr, Amazon CloudSearch, Azure Search

---

## Comparison Matrix

| Feature                  | Relational         | Document                  | Indexed/Search    |
| ------------------------ | ------------------ | ------------------------- | ----------------- |
| **Schema**               | Fixed, predefined  | Flexible, dynamic         | Schema-less       |
| **ACID Compliance**      | ✅ Full            | ⚠️ Limited/Optional       | ❌ No             |
| **Scaling**              | Vertical primarily | Horizontal                | Horizontal        |
| **Query Language**       | SQL                | Custom (MongoDB QL, etc.) | DSL/Query API     |
| **Consistency**          | Strong             | Eventual                  | Eventual          |
| **Performance (Reads)**  | Good               | Very Good                 | Excellent         |
| **Performance (Writes)** | Good               | Very Good                 | Good              |
| **Complex Queries**      | Excellent          | Limited                   | Good (for search) |
| **Data Integrity**       | Excellent          | Good                      | Limited           |
| **Development Speed**    | Moderate           | Fast                      | Moderate          |
| **Learning Curve**       | Moderate           | Easy                      | Steep             |

---

## MongoDB vs PostgreSQL

The technical differences between MongoDB and PostgreSQL have become less pronounced over time, as both databases have evolved to incorporate features from each other.

### Convergence of Features

- **PostgreSQL**: Can now store JSON data natively with JSONB support, making it suitable for semi-structured data
- **MongoDB**: Now supports full ACID transactions and multi-document consistency
- **Both**: Support for horizontal scaling, though with different approaches

### PostgreSQL Strengths

- **Mature SQL ecosystem**: Extensive tooling, ORMs, and developer knowledge
- **ACID compliance**: Strong consistency and transactional guarantees
- **JSON + Relational**: Best of both worlds - structured tables with flexible JSON columns
- **Advanced features**: Window functions, CTEs, full-text search, and extensions
- **Cost-effective**: Open source with enterprise features

### MongoDB Strengths

- **Document-native**: Designed from ground up for document storage
- **Horizontal scaling**: Sharding built into the core architecture
- **Flexible schema**: No migrations required for schema changes
- **Developer experience**: Natural mapping to application objects
- **Cloud-native**: Excellent cloud database services (Atlas)

### Decision Factors

**Choose PostgreSQL when:**

- You have existing SQL expertise and tooling
- You need strong consistency and ACID guarantees
- You have both structured and semi-structured data
- You want a single database for multiple use cases
- Budget constraints favor open source solutions

**Choose MongoDB when:**

- You primarily work with document-like data
- You need to scale horizontally from the start
- Your schema changes frequently
- You're building a new application with modern practices
- You prefer NoSQL query syntax

---

## 🔥 The Fundamental Difference: SQL vs NoSQL

### The Core Trade-off: Consistency vs Availability/Partition Tolerance

The **most important difference** between SQL and NoSQL databases isn't syntax or data models—it's how they handle the **CAP Theorem**:

**CAP Theorem**: You can only guarantee 2 out of 3:

- **C**onsistency: All nodes see the same data simultaneously _(only applies to distributed systems)_
- **A**vailability: System remains operational
- **P**artition Tolerance: System continues despite network failures _(only applies to distributed systems)_

> **Important Note**: If you're running a **single database instance** (one server), the CAP theorem doesn't directly apply. You automatically have consistency because there's only one copy of the data. The fundamental difference then becomes about **transaction models** and **how the database handles concurrent operations**.

### SQL Databases: Choose Consistency

**SQL databases prioritize Consistency + Availability (CA)** _(in distributed setups)_

**For single instances**: Focus on ACID transactions and immediate consistency

```sql
-- This MUST complete fully or fail completely
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- Both updates happen, or neither does
```

**Key Characteristics:**

- **ACID Transactions**: All operations complete or none do
- **Immediate Consistency**: When a write completes, all subsequent reads see that data immediately
- **Locking**: System may block operations to maintain consistency _(applies to both single and distributed)_
- **Trade-off**: May become unavailable during network partitions _(only in distributed setups)_

### NoSQL Databases: Choose Availability + Partition Tolerance

**NoSQL databases prioritize Availability + Partition Tolerance (AP)** _(in distributed setups)_

**For single instances**: Focus on flexible schema and fast operations without strict ACID guarantees

```javascript
// This operation returns immediately, consistency happens later (in distributed setups)
// For single instance: operation completes immediately with eventual consistency for indexes/views
db.users.updateOne({ _id: userId }, { $set: { lastLogin: new Date() } });
```

**Key Characteristics:**

- **Eventual Consistency**: In distributed setups, data will be consistent "eventually" (usually within milliseconds)
- **Always Available**: System keeps working even during network issues _(distributed)_
- **No Blocking**: Operations don't wait for cross-node coordination _(single instance: no complex locking)_
- **Trade-off**: Temporary inconsistencies possible _(mainly in distributed setups)_

### Concrete Example: Bank Transfer

**With SQL Database (PostgreSQL):**

```sql
-- Transfer $100 from Account A to Account B
BEGIN;
  -- Both operations MUST succeed together
  UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'B';

  -- If network fails here, ENTIRE transaction rolls back
  -- No money is lost, but system may become unavailable
COMMIT;
```

**With NoSQL Database (MongoDB):**

```javascript
// Update Account A (succeeds immediately)
db.accounts.updateOne({ _id: "A" }, { $inc: { balance: -100 } });

// Update Account B (succeeds immediately)
db.accounts.updateOne({ _id: "B" }, { $inc: { balance: 100 } });

// Problem: If network fails between operations,
// Account A is debited but Account B not credited yet
// System stays available but temporarily inconsistent
```

### Why This Matters

**Choose SQL when:**

- **Data integrity is critical** (banking, medical records, inventory)
- **Consistency is more important than availability**
- **You can tolerate brief downtime** for the sake of correctness

**Choose NoSQL when:**

- **Availability is critical** (social media, content delivery)
- **You can handle temporary inconsistencies**
- **Scale and performance matter more than perfect consistency**

### Real-World Impact

**SQL Example - Banking:**

```
❌ System temporarily unavailable during network issue
✅ Money never disappears or gets duplicated
✅ All balances always add up correctly
```

**NoSQL Example - Social Media:**

```
✅ Users can always post and read content
⚠️ Like counts might be temporarily inconsistent
⚠️ New posts might not appear immediately everywhere
✅ System handles millions of users without blocking
```

### The Bottom Line

The most crucial difference is **when** data becomes consistent:

- **SQL**: Data is consistent **immediately** (Strong Consistency)
- **NoSQL**: Data becomes consistent **eventually** (Eventual Consistency)

This fundamental trade-off drives every other difference between SQL and NoSQL databases.

---

## Decision Framework

### Step 1: Analyze Your Data

```
Highly Structured + Complex Relationships
├── Multiple entities with foreign keys
├── Need for complex JOINs
└── Choose: Relational Database

Semi-Structured + Nested Objects
├── JSON-like documents
├── Varying fields per record
└── Choose: Document Database

Unstructured Text + Search Requirements
├── Full-text search needed
├── Log/event data
└── Choose: Indexed/Search Database
```

### Step 2: Consider Non-Functional Requirements

| Requirement            | Relational | Document | Indexed |
| ---------------------- | ---------- | -------- | ------- |
| **Strong Consistency** | ✅         | ⚠️       | ❌      |
| **Horizontal Scale**   | ⚠️         | ✅       | ✅      |
| **Fast Development**   | ⚠️         | ✅       | ⚠️      |
| **Complex Queries**    | ✅         | ⚠️       | ⚠️      |
| **Search Performance** | ⚠️         | ⚠️       | ✅      |
| **ACID Transactions**  | ✅         | ⚠️       | ❌      |

### Step 3: Architecture Considerations

**Single Database Approach**

- Use one primary database type
- Simpler architecture and operations
- May require compromises

**Polyglot Persistence**

- Use multiple database types for different use cases
- More complex but optimized for each use case
- Example: PostgreSQL for transactions + Elasticsearch for search

---

## Real-World Examples

### E-commerce Platform

**Product Catalog**: Document database (MongoDB)

- Flexible product attributes
- Nested categories and variations
- Fast reads for browsing

**Orders & Payments**: Relational database (PostgreSQL)

- ACID transactions required
- Complex relationships (users, orders, payments)
- Strong consistency needed

**Search & Recommendations**: Indexed database (Elasticsearch)

- Full-text product search
- Real-time analytics
- Faceted filtering

### Content Management System

**Content Storage**: Document database

- Flexible content types
- Nested media and metadata
- Version history as documents

**User Management**: Relational database

- Structured user data
- Role-based permissions
- Audit trails

---

_This comparison should help you choose the right database type for your specific use case. Consider starting with the simplest solution that meets your requirements and evolving as needed._

### 📝 Single Instance vs Distributed: What's the Difference?

**Single Database Instance (Most Common Setup):**

```
Your App ←→ Single Database Server
```

- **One copy** of your data exists
- **No "nodes"** to worry about
- **Consistency is automatic** (only one source of truth)
- **Main difference**: Transaction model and schema flexibility

**Distributed Database (Multiple Servers):**

```
Your App ←→ Load Balancer ←→ [DB Server 1, DB Server 2, DB Server 3]
```

- **Multiple copies** of your data across servers
- **"Nodes"** = individual database servers
- **Consistency becomes complex** (keeping all copies in sync)
- **CAP theorem becomes relevant**

**For Single Instances, Focus On:**

| SQL (PostgreSQL)                     | NoSQL (MongoDB)                |
| ------------------------------------ | ------------------------------ |
| ✅ ACID transactions                 | ✅ Fast operations             |
| ✅ Strong data integrity             | ✅ Schema flexibility          |
| ✅ Complex queries                   | ✅ Simple scaling up           |
| ⚠️ Schema changes require migrations | ⚠️ Limited complex queries     |
| ⚠️ Vertical scaling only             | ⚠️ Less strict data validation |

**When Nodes/Distribution Matters:**

- High traffic applications (thousands of concurrent users)
- Need for geographic distribution
- High availability requirements (99.9%+ uptime)
- Data too large for single server

**For Most Applications:**
Start with a single, well-configured database instance. You can always scale later when you actually need it.

---
