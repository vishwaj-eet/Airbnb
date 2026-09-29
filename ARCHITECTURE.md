# Vacation-Rental Marketplace (Airbnb-Scale) — Production Architecture

This document presents the high-level production architecture for a global vacation-rental marketplace capable of serving over 100M+ requests per day with sub-50ms search latency, sub-second listing page loads, and zero double-booking guarantees.

Accompanying deliverables:
- **Vector Diagram (SVG)**: [`architecture-diagram.svg`](./architecture-diagram.svg)
- **High-Res Diagram (PNG)**: [`architecture-diagram.png`](./architecture-diagram.png)
- **Document Diagram (PDF)**: [`architecture-diagram.pdf`](./architecture-diagram.pdf)
- **Interactive In-App Viewer**: Accessible via the top banner in the application UI.

---

## 1. System Scaling Objectives & Key Metrics

| Metric | Target SLA | Implementation Strategy |
| :--- | :--- | :--- |
| **Search Query Latency (P99)** | `< 50 ms` | Elasticsearch geo-point clustering + In-memory Redis calendar bitmaps |
| **Listing Page Time-to-First-Byte (TTFB)** | `< 100 ms` | Cloudflare / Vercel Edge caching with On-Demand Incremental Static Regeneration (ISR) |
| **Double Booking Prevention** | `0% error tolerance` | Distributed Redlock concurrency guard + PostgreSQL strict serializable isolation level |
| **Availability / Uptime** | `99.99%` | Multi-region active-active deployment across 3 global cloud regions (US, EU, Asia) |
| **Read-to-Write Ratio** | `100:1` | Aggressive multi-tier caching (Edge &rarr; Redis &rarr; Read Replicas) |

---

## 2. Architectural Tiers Breakdown

### Tier 1: Global Edge Acceleration & Client Delivery
- **Next.js & React Web**:
  - Utilizes **Incremental Static Regeneration (ISR)** for listing pages (such as `Romantic Jacuzzi 1BHK Candolim | Mirashya UG10`).
  - Pre-renders static HTML containing images, descriptions, host details, and amenities.
  - When a host edits property details or prices, an event-driven webhook executes `revalidateTag('listing-ug10')` across the Edge CDN in `< 150ms`.
- **Global Edge Network (Cloudflare Anycast + AWS CloudFront 310+ POPs)**:
  - Terminates TLS 1.3 at the nearest point-of-presence (POP).
  - Web Application Firewall (WAF) mitigates Layer 3/4/7 DDoS attacks and automated scraping bots.
  - Media delivery pipeline dynamically serves WebP and AVIF responsive image sizes (`srcset: 400w, 800w, 1200w, 1600w`).

### Tier 2: API Gateway & Backend-for-Frontend (BFF)
- **Envoy Proxy Gateway**:
  - High-performance C++ ingress proxy managing service mesh routing, circuit breaking, and mTLS between services.
- **Token Bucket Rate Limiting**:
  - Redis-backed distributed rate limiter throttling requests by IP, authenticated user ID, and API client credentials to protect backend services from surges.
- **JWT & Stateless Authentication**:
  - Cryptographically verifies Ed25519 user session tokens without database lookups in `< 2ms`.
- **GraphQL Federation / REST BFF**:
  - Apollo Federation router combines microservice subgraphs into a unified client schema, preventing mobile and web clients from making multiple round-trips over mobile networks.

### Tier 3: Core Domain Microservices (Kubernetes EKS)
- **Listing & Inventory Service**:
  - Source of truth for property configurations, bedrooms, private jacuzzi features, house rules, and room photos.
  - Publishes `ListingUpdatedEvent` to Apache Kafka whenever changes occur.
- **Search & Discovery Service**:
  - Handles multi-criteria property discovery based on destination, dates, guest counts, and amenities.
  - Vector embeddings ranking for semantic discovery (e.g. "romantic stays near Candolim beach").
- **Booking & Saga Orchestrator Engine**:
  - Orchestrates multi-step reservation flows using the **Saga Pattern**:
    1. *Acquire Inventory Hold* (Redis key with 10-minute TTL).
    2. *Authorize Payment* (Stripe / Razorpay payment intent).
    3. *Persist Booking Record* (PostgreSQL Aurora primary shard).
    4. *Confirm Calendar Hold & Notify Host* (Mirashya Homes WhatsApp / push notification).
    5. *Compensation*: If payment fails or is rejected, compensation events automatically release the inventory hold.
- **Dynamic Pricing & Yield Engine**:
  - Machine-learning driven pricing assessing seasonal demand, weekend spikes, Goa music festivals, and length-of-stay discounts (e.g. 10% weekly discount).
  - Issues signed, tamper-proof quote tokens with 15-minute guaranteed pricing.
- **Trust, Reviews & Safety Service**:
  - Verified stay reviews with double-blind submissions (reviews published simultaneously only when both guest and host submit, or after 14 days).

### Tier 4: Storage, Search & Event Bus
- **PostgreSQL Aurora Multi-Region Sharded Database**:
  - Horizontally partitioned by `listing_id` and `user_id` using Citus / Vitess.
  - Strict ACID serializability ensures concurrent transactions for the same check-in dates never overlap.
  - Multi-AZ read replicas handle analytics, host management dashboards, and calendar queries.
- **Redis Availability Bitmaps (Sub-millisecond Date Filtering)**:
  - Each listing represents 365 calendar days as a compact 365-bit vector in Redis (`1` = available, `0` = booked).
  - Range availability queries execute bitwise `BITOP AND` across requested check-in and checkout nights in sub-millisecond memory lookups.
- **Elasticsearch / OpenSearch Geospatial Cluster**:
  - Houses indexed property data with `geo_point` spatial coordinates centered on Candolim, Goa (`lat: 15.5188, lng: 73.7631`).
  - Supports radius queries (`within 2km of Candolim Beach`), polygon boundaries, and faceted filtering (`amenities: ["jacuzzi", "pool", "wifi"]`).
- **Apache Kafka Event Bus**:
  - High-throughput distributed event streaming backbone with partitioned topics (`booking.created`, `listing.updated`, `review.submitted`).
  - Ensures at-least-once delivery with zero message loss and message replay capabilities for downstream consumer synchronization.

### Tier 5: Media Pipeline, Analytics Lake & Multi-Region Deployment
- **Media Object Storage (Cloudflare R2 / AWS S3 + Sharp CDN)**:
  - Client uploads bypass the API gateway using direct presigned S3 URLs.
  - Asynchronous Lambda workers invoke `sharp` to strip EXIF data, compress images, and generate multiple responsive resolutions.
- **Snowflake / ClickHouse Real-time Analytics**:
  - Columnar data warehouse ingesting Kafka events for business intelligence, booking conversion funnel analytics, and ML model retraining.
- **Multi-Region Kubernetes (EKS) & GitOps Deployment**:
  - Multi-cluster Kubernetes architecture across 3 geographic zones (US-East, EU-Central, AP-South Mumbai).
  - Horizontal Pod Autoscaler (HPA) automatically provisions container replicas based on CPU utilization and incoming HTTP request queue depth.
  - ArgoCD enables declarative GitOps deployments with canary rollouts and automated rollback triggers if error rates exceed 0.05%.
  - Observability stack powered by OpenTelemetry distributed tracing and Datadog APM monitors request journeys end-to-end.
