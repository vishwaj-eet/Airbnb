import React, { useState } from 'react';
import { X, Layers, Database, Server, Search, Globe, Shield, Cpu, Cloud, GitBranch, Download, ExternalLink } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'frontend' | 'backend' | 'search' | 'storage' | 'deployment'>('diagram');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-80 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in">
      <div className="bg-[#0f172a] text-white rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden relative animate-in zoom-in-95">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF385C]/20 border border-[#FF385C]/40 rounded-xl text-[#FF385C]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Production-Scale Vacation Marketplace Architecture
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Airbnb Scale (100M+ Req/day)
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Scaling Strategy: Frontend · Backend · Storage · Search · Cloud Deployment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/architecture-diagram.svg"
              download="airbnb-marketplace-architecture.svg"
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#FF385C]" />
              <span>Download SVG</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'diagram', label: 'Full System Diagram', icon: Layers },
            { id: 'frontend', label: '1. Frontend & CDN', icon: Globe },
            { id: 'backend', label: '2. Gateway & Microservices', icon: Server },
            { id: 'search', label: '3. Search & Availability', icon: Search },
            { id: 'storage', label: '4. Storage & Event Bus', icon: Database },
            { id: 'deployment', label: '5. Multi-Region Deployment', icon: Cloud },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#FF385C] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'diagram' && (
            <div className="space-y-6">
              {/* High Level SVG Architecture Map */}
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-inner overflow-x-auto">
                <svg viewBox="0 0 1100 680" className="w-full min-w-[900px] h-auto font-sans" xmlns="http://www.w3.org/2000/svg">
                  {/* Background grid */}
                  <defs>
                    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF385C" />
                      <stop offset="100%" stopColor="#D70466" />
                    </linearGradient>
                    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                  </defs>

                  {/* Top Tier: Clients & CDN */}
                  <rect x="30" y="30" width="1040" height="90" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="50" y="55" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 1: GLOBAL CLIENTS & EDGE DELIVERY</text>
                  
                  {/* Client Boxes */}
                  <rect x="60" y="70" width="160" height="38" rx="8" fill="#0f172a" stroke="#475569" />
                  <text x="140" y="94" fill="#f8fafc" fontSize="12" fontWeight="600" textAnchor="middle">Web (Next.js / React)</text>

                  <rect x="240" y="70" width="160" height="38" rx="8" fill="#0f172a" stroke="#475569" />
                  <text x="320" y="94" fill="#f8fafc" fontSize="12" fontWeight="600" textAnchor="middle">Mobile Apps (iOS / Android)</text>

                  {/* Edge Network */}
                  <rect x="440" y="65" width="610" height="46" rx="8" fill="url(#primaryGrad)" />
                  <text x="745" y="93" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Global Edge CDN (Cloudflare Anycast + AWS CloudFront) · DDoS Shield · Edge SSR/ISR Caching
                  </text>

                  {/* Flow Arrow 1 */}
                  <line x1="550" y1="120" x2="550" y2="160" stroke="#FF385C" strokeWidth="2.5" strokeDasharray="5,5" />
                  <polygon points="545,155 550,165 555,155" fill="#FF385C" />

                  {/* Tier 2: API Gateway & Envoy */}
                  <rect x="30" y="165" width="1040" height="90" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="50" y="190" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 2: API GATEWAY & BACKEND-FOR-FRONTEND (BFF)</text>

                  <rect x="60" y="205" width="220" height="38" rx="8" fill="url(#blueGrad)" />
                  <text x="170" y="229" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Envoy Proxy & WAF Gateway</text>

                  <rect x="310" y="205" width="230" height="38" rx="8" fill="#0f172a" stroke="#3b82f6" />
                  <text x="425" y="229" fill="#93c5fd" fontSize="12" fontWeight="600" textAnchor="middle">Rate Limiting & Token Bucket</text>

                  <rect x="560" y="205" width="230" height="38" rx="8" fill="#0f172a" stroke="#3b82f6" />
                  <text x="675" y="229" fill="#93c5fd" fontSize="12" fontWeight="600" textAnchor="middle">Auth0 / JWT Verification</text>

                  <rect x="810" y="205" width="240" height="38" rx="8" fill="#0f172a" stroke="#3b82f6" />
                  <text x="930" y="229" fill="#93c5fd" fontSize="12" fontWeight="600" textAnchor="middle">GraphQL Federation / REST BFF</text>

                  {/* Flow Arrow 2 */}
                  <line x1="550" y1="255" x2="550" y2="295" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="5,5" />
                  <polygon points="545,290 550,300 555,290" fill="#3b82f6" />

                  {/* Tier 3: Core Microservices */}
                  <rect x="30" y="300" width="1040" height="110" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="50" y="325" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 3: CORE MICROSERVICES LAYER (KUBERNETES EKS AUTO-SCALED)</text>

                  <g transform="translate(50, 335)">
                    <rect x="10" y="5" width="180" height="55" rx="8" fill="url(#purpleGrad)" />
                    <text x="100" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Listing Service</text>
                    <text x="100" y="46" fill="#e9d5ff" fontSize="10" textAnchor="middle">Photos, Amenities, Rules</text>

                    <rect x="210" y="5" width="190" height="55" rx="8" fill="url(#purpleGrad)" />
                    <text x="305" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Search & Discovery</text>
                    <text x="305" y="46" fill="#e9d5ff" fontSize="10" textAnchor="middle">Geo-hash & Filter engine</text>

                    <rect x="420" y="5" width="190" height="55" rx="8" fill="url(#purpleGrad)" />
                    <text x="515" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Booking & Saga Engine</text>
                    <text x="515" y="46" fill="#e9d5ff" fontSize="10" textAnchor="middle">Distributed lock & Hold</text>

                    <rect x="630" y="5" width="170" height="55" rx="8" fill="url(#purpleGrad)" />
                    <text x="715" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Dynamic Pricing</text>
                    <text x="715" y="46" fill="#e9d5ff" fontSize="10" textAnchor="middle">Yield & Seasonality ML</text>

                    <rect x="820" y="5" width="180" height="55" rx="8" fill="url(#purpleGrad)" />
                    <text x="910" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Payment & Trust</text>
                    <text x="910" y="46" fill="#e9d5ff" fontSize="10" textAnchor="middle">Stripe/Razorpay Webhooks</text>
                  </g>

                  {/* Flow Arrow 3 */}
                  <line x1="550" y1="410" x2="550" y2="445" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="5,5" />
                  <polygon points="545,440 550,450 555,440" fill="#8b5cf6" />

                  {/* Tier 4: Storage, Search & Event Bus */}
                  <rect x="30" y="450" width="1040" height="110" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="50" y="475" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 4: DATA, STORAGE, EVENT STREAM & CACHE CLUSTERS</text>

                  <g transform="translate(50, 485)">
                    <rect x="10" y="5" width="220" height="55" rx="8" fill="url(#emeraldGrad)" />
                    <text x="120" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">PostgreSQL Aurora Shards</text>
                    <text x="120" y="46" fill="#a7f3d0" fontSize="10" textAnchor="middle">Multi-Region, Sharded by Listing ID</text>

                    <rect x="250" y="5" width="230" height="55" rx="8" fill="url(#emeraldGrad)" />
                    <text x="365" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Redis Availability Cluster</text>
                    <text x="365" y="46" fill="#a7f3d0" fontSize="10" textAnchor="middle">Calendar Bitmaps & Redlock</text>

                    <rect x="500" y="5" width="240" height="55" rx="8" fill="url(#emeraldGrad)" />
                    <text x="620" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Elasticsearch / OpenSearch</text>
                    <text x="620" y="46" fill="#a7f3d0" fontSize="10" textAnchor="middle">Geospatial queries, Facets & Synonyms</text>

                    <rect x="760" y="5" width="240" height="55" rx="8" fill="url(#emeraldGrad)" />
                    <text x="880" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Apache Kafka Event Bus</text>
                    <text x="880" y="46" fill="#a7f3d0" fontSize="10" textAnchor="middle">Booking events, Audit, Analytics</text>
                  </g>

                  {/* Flow Arrow 4 */}
                  <line x1="550" y1="560" x2="550" y2="585" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5,5" />
                  <polygon points="545,580 550,590 555,580" fill="#10b981" />

                  {/* Tier 5: Media, Warehouse & Deployment */}
                  <rect x="30" y="590" width="1040" height="75" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="50" y="612" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="1">TIER 5: ASSET PIPELINE, DATA LAKE & DEPLOYMENT</text>

                  <g transform="translate(50, 620)">
                    <rect x="10" y="3" width="310" height="34" rx="6" fill="#0f172a" stroke="#f59e0b" />
                    <text x="165" y="25" fill="#fde68a" fontSize="11" fontWeight="600" textAnchor="middle">
                      Cloudflare R2 / AWS S3 + Sharp CDN Pipeline
                    </text>

                    <rect x="340" y="3" width="310" height="34" rx="6" fill="#0f172a" stroke="#f59e0b" />
                    <text x="495" y="25" fill="#fde68a" fontSize="11" fontWeight="600" textAnchor="middle">
                      Snowflake / ClickHouse Real-time Analytics Lake
                    </text>

                    <rect x="670" y="3" width="330" height="34" rx="6" fill="#0f172a" stroke="#f59e0b" />
                    <text x="835" y="25" fill="#fde68a" fontSize="11" fontWeight="600" textAnchor="middle">
                      Kubernetes EKS + ArgoCD GitOps + Prometheus/Datadog
                    </text>
                  </g>
                </svg>
              </div>

              {/* Architecture Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#FF385C]" />
                    <span>Global Edge & ISR</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Statically rendered property pages cached across 300+ Edge POPs. On listing edits, Vercel/Cloudflare On-Demand Revalidation purges cache in &lt;150ms.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-400" />
                    <span>Sub-50ms Geo Search</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Elasticsearch cluster with geo_point indexing and inverted indices for amenities. Real-time calendar availability checked via Redis bitfields before returning search cards.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Zero Double-Booking Guarantee</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Distributed locking via Redis Redlock + PostgreSQL strict serializable isolation level with Saga orchestrator pattern managing Stripe authorization and state rollbacks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'frontend' && (
            <div className="space-y-6 max-w-4xl text-slate-300 text-sm leading-relaxed">
              <h3 className="text-xl font-bold text-white">1. Frontend Architecture & Edge CDN Strategy</h3>
              <p>
                Vacation rental marketplaces exhibit a read-to-write ratio of roughly 100:1. The frontend strategy is optimized for instantaneous page loads, high SEO ranking, and resilience against flash traffic.
              </p>
              <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Incremental Static Regeneration (ISR)</h4>
                  <p className="text-xs text-slate-400">
                    Listing pages (such as Mirashya UG10) are pre-rendered at build time or generated on the first request and cached at Cloudflare / Vercel Edge. When host edits property details or prices, an event webhook triggers instantaneous on-demand revalidation (`revalidateTag('listing-ug10')`).
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Dynamic State Hydration (Micro-Frontends / Island Architecture)</h4>
                  <p className="text-xs text-slate-400">
                    Heavy static components (Photos, Descriptions, House rules, Map) load with 0ms JavaScript overhead. Dynamic widgets (Interactive Calendar, Guest Counter, Reserve button, Lightbox) hydrate independently with TanStack Query / SWR for live pricing and availability sync.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Global Media CDN & Adaptive Image Pipeline</h4>
                  <p className="text-xs text-slate-400">
                    Host photos are ingested via direct presigned S3 URLs, scanned for safety, resized asynchronously using Sharp / Cloudflare Workers into AVIF and WebP responsive srcset sizes (400w, 800w, 1200w, 1600w), achieving 90%+ Google Lighthouse performance scores.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="space-y-6 max-w-4xl text-slate-300 text-sm leading-relaxed">
              <h3 className="text-xl font-bold text-white">2. Backend Gateway & Microservices Strategy</h3>
              <p>
                Domain-driven design decomposes the marketplace into isolated microservices communicating asynchronously via gRPC and Apache Kafka.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Listing & Inventory Service</h4>
                  <p className="text-xs text-slate-400">
                    Manages property metadata, amenities, sleeping configurations, and high-res media references. Publishes `ListingUpdatedEvent` to Kafka for downstream search indexing.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Booking & Reservation Saga</h4>
                  <p className="text-xs text-slate-400">
                    Coordinates multi-step checkout: Lock inventory (Redis) &rarr; Authorize Payment (Stripe) &rarr; Persist booking (PostgreSQL) &rarr; Confirm calendar hold. If payment fails, compensation events release inventory lock automatically.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Dynamic Pricing & Yield Engine</h4>
                  <p className="text-xs text-slate-400">
                    Evaluates seasonality, weekend demand, local Goa festivals (Sunburn, New Year), and host discounts (e.g. 10% weekly stay) in real-time, delivering cached quote tokens with 15-minute expiration guarantees.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Trust & Reviews Service</h4>
                  <p className="text-xs text-slate-400">
                    Manages verified guest reviews, double-blind review submissions, and automated sentiment analysis for Superhost eligibility calculations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="space-y-6 max-w-4xl text-slate-300 text-sm leading-relaxed">
              <h3 className="text-xl font-bold text-white">3. Search & Real-Time Availability Engine</h3>
              <p>
                Search queries must filter millions of properties by geographic coordinates, date availability, guest counts, and specific amenities (like "Jacuzzi") in under 50 milliseconds.
              </p>
              <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Elasticsearch / OpenSearch Geo-Clustering</h4>
                  <p className="text-xs text-slate-400">
                    Properties are indexed with spatial `geo_point` fields. Bounding box and geo-distance queries identify properties within Candolim or Goa with facet aggregations for filters (Jacuzzi, Pool, Wifi).
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Redis Availability Bitmaps (Fast Calendar Filtering)</h4>
                  <p className="text-xs text-slate-400">
                    Each listing's 365-day availability is represented as a compact bitfield in Redis (`1` = available, `0` = booked). Date range queries execute bitwise `BITOP AND` across requested nights in sub-millisecond memory lookups.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-6 max-w-4xl text-slate-300 text-sm leading-relaxed">
              <h3 className="text-xl font-bold text-white">4. Storage Tier & Event Bus Architecture</h3>
              <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Distributed PostgreSQL Aurora Sharding</h4>
                  <p className="text-xs text-slate-400">
                    Transactional data is horizontally sharded by `listing_id` and `user_id`. Citus or Vitess transparently routes writes to primary masters while read replicas handle analytics and host dashboards.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Apache Kafka Event Bus</h4>
                  <p className="text-xs text-slate-400">
                    High-throughput event streaming spine: `booking.created`, `review.posted`, `payment.succeeded`. Enables decoupled microservice consumption, real-time analytics with ClickHouse, and audit logging.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deployment' && (
            <div className="space-y-6 max-w-4xl text-slate-300 text-sm leading-relaxed">
              <h3 className="text-xl font-bold text-white">5. Deployment, Scaling & Reliability</h3>
              <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">Multi-Region Kubernetes (EKS / GKE)</h4>
                  <p className="text-xs text-slate-400">
                    Active-Active multi-cluster deployment across US-East, EU-Central, and AP-South (Mumbai). Horizontal Pod Autoscalers (HPA) scale pods based on CPU and request queues.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white mb-1">GitOps & Observability</h4>
                  <p className="text-xs text-slate-400">
                    ArgoCD handles progressive canary rollouts with automated rollback if error rate exceeds 0.05%. Distributed tracing with OpenTelemetry and Datadog tracks end-to-end request lifecycles.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
