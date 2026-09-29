---
name: scaling-architecture
description: Architectural patterns and design best practices for scaling a vacation rental marketplace to 100M+ requests per day.
---

# Scaling Architecture Skill

This skill outlines the scaling strategies and architectural blueprints for vacation-rental marketplaces:

## 1. High-Performance Search
- **Geospatial Indexing**: Store property lat/lng coordinates in Elasticsearch `geo_point` fields.
- **Availability Bitmaps**: Cache 365-day booking vectors in Redis as compact bitfields to evaluate date overlaps in `< 1ms`.
- **Faceted Filters**: Pre-aggregate amenity counts (Jacuzzi, Pool, Dedicated Workspace) using inverted indices.

## 2. Distributed Booking Consistency (Zero Double-Booking)
- **Concurrency Control**: Use Redis `Redlock` to acquire a lease on the listing for the target dates during the checkout session.
- **Saga Orchestrator**: Manage the distributed transaction across Inventory Hold &rarr; Payment Authorization &rarr; Booking Persistence &rarr; Host Notification.
- **Strict Serializable DB Transactions**: Isolate database writes to prevent phantom reads or overlapping date insertions.

## 3. Global Caching Strategy
- **Edge Static Revalidation (ISR)**: Cache rendered property detail pages at Cloudflare / Vercel Edge POPs with tag-based on-demand purge triggers.
- **Dynamic Pricing Engine**: Issue cryptographic 15-minute guaranteed pricing tokens to avoid recomputing complex seasonal rate rules on every click.
