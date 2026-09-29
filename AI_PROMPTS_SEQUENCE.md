# AI-Assisted Development: Sequence of Prompts & Workflow

This document records the complete sequence of prompts, agent workflows, and iterative refinement steps used during the development of this project, as required for the Take-Home Task submission.

---

## Stage 1: Specification Ingestion & Requirement Analysis

### Prompt 1.1: Multi-Modal Requirement Extraction
> **Prompt:**  
> *"Analyze the take-home challenge document 'Take-Home Task: Airbnb-Clone App' by Playpower. Extract the exact property to reproduce, visual components, interaction requirements, required overlays (Photo Tour and Lightbox), technology constraints, architectural deliverables, and submission guidelines."*

**Outcome & Agent Reasoning:**  
- Identified exact listing: **Romantic Jacuzzi 1BHK Candolim | Mirashya UG10** located in **Candolim, Goa, India**.
- Identified the three mandatory views:
  1. **Listing Page**: Full property page with hero photo mosaic, host info, highlights, sleeping arrangements, amenities, calendar, reviews, map, host details, and sticky booking card.
  2. **Photo Tour View**: Full-screen photo gallery grouped by room with category navigation pills.
  3. **Lightbox View**: Full-screen single-photo viewer with left/right navigation, keyboard arrows, slide animations, and thumbnail scrubber.
- Extracted explicit deliverables:
  - Architecture diagram for production-scale marketplace (image/pdf file).
  - Sub-agent and skill configuration files.
  - Sequence of prompts used for AI-assisted development.
  - Desktop-only implementation scope.

---

## Stage 2: Tech Stack Selection & Project Scaffolding

### Prompt 2.1: Project Setup & Modern Tooling
> **Prompt:**  
> *"Initialize a high-performance React + TypeScript application with Vite and Tailwind CSS v4. Equip the project with Lucide React for pixel-perfect Airbnb icons, Framer Motion for slide/fade transitions, and canvas-confetti for reservation celebration feedback."*

**Outcome & Agent Reasoning:**  
- Scaffolded Vite with TypeScript, React 19, `@tailwindcss/vite`, `lucide-react`, and `framer-motion`.
- Configured `tsconfig.json` for strict type checking and clean bundling.
- Verified lightning-fast production build (`built in < 1s`).

---

## Stage 3: Data Modeling & Curated Authentic Property Asset Ingestion

### Prompt 3.1: Data Schema & Real Property Ingestion
> **Prompt:**  
> *"Design comprehensive TypeScript interfaces for the listing (`ListingData`, `PhotoItem`, `AmenityItem`, `ReviewItem`, `RatingCategory`). Populate with authentic data for 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10' including 16 high-definition photos categorized into Living room, Jacuzzi & Bathroom, Bedroom, Kitchen, and Pool, along with real reviews, Superhost credentials, and accurate Candolim pricing."*

**Outcome & Agent Reasoning:**  
- Created `src/types/index.ts` with strict typing.
- Built `src/data/listingData.ts` with authentic room breakdown, Forest Essentials toiletries, 150 Mbps Wi-Fi, 4.92 rating score, and genuine guest reviews.

---

## Stage 4: Core UI & Section Component Development

### Prompt 4.1: Header, Hero Grid & Sticky Navigation
> **Prompt:**  
> *"Build the ListingHeader and HeroGrid components. Recreate the 5-photo mosaic layout with rounded outer corners, hover brightness effects, and a floating 'Show all photos' button. Implement a StickyNav component that smoothly slides in when scrolling past the hero grid, featuring section anchors (Photos, Amenities, Reviews, Location) and a mini reservation CTA."*

**Outcome & Agent Reasoning:**  
- Developed `src/components/ListingHeader.tsx` with rating link, share trigger, and animated heart wishlist toggle.
- Developed `src/components/HeroGrid.tsx` with exact 50% / 50% split and floating button.
- Developed `src/components/StickyNav.tsx` with scroll event listener and section indicator.

### Prompt 4.2: Property Details, Highlights & Amenities
> **Prompt:**  
> *"Implement PropertyHighlights, SleepArrangement, DescriptionSection, and AmenitiesSection. Include the signature 'Guest favourite' badge with gold laurels, Superhost badge, where you'll sleep cards, an expandable description modal, and a 2-column top 10 amenities preview with a 'Show all 35 amenities' modal featuring real-time search filtering."*

**Outcome & Agent Reasoning:**  
- Implemented rich components with clean Tailwind typography.
- Built accessible modals with focus management and search filters for amenities.

### Prompt 4.3: Interactive Dual-Month Calendar & Reviews
> **Prompt:**  
> *"Create an interactive dual-month CalendarSection supporting date range selection, minimum stay calculation, and clear dates functionality. Build the ReviewsSection featuring an overall 4.92 rating breakdown across Cleanliness, Accuracy, Check-in, Communication, Location, and Value, guest review cards, and a searchable reviews modal."*

**Outcome & Agent Reasoning:**  
- Built `src/components/CalendarSection.tsx` with date range hover feedback.
- Built `src/components/ReviewsSection.tsx` with visual score bars and keyword search.

### Prompt 4.4: Map, Host Bio & Sticky Booking Card
> **Prompt:**  
> *"Develop LocationSection with custom Airbnb map styling centered on Candolim, Goa. Build HostSection with Superhost metrics and message host dialog. Build the sticky BookingCard featuring live check-in/checkout dates, guest counter popover, dynamic total calculation with taxes and weekly discounts, and an interactive reservation confirmation modal with celebratory confetti."*

**Outcome & Agent Reasoning:**  
- Developed `src/components/LocationSection.tsx` and `src/components/HostSection.tsx`.
- Developed `src/components/BookingCard.tsx` with real-time synchronized calculations and booking receipt modal.

---

## Stage 5: Recreating the Two Required Overlay Views

### Prompt 5.1: Screen 2 — Full-Screen Photo Tour
> **Prompt:**  
> *"Recreate the Photo Tour overlay view as shown in the reference screenshot on Page 2. It must open full-screen when clicking 'Show all photos' or from the hero grid, feature a sticky top navigation bar with room category pills (Living room, Jacuzzi & Bathroom, Bedroom, Kitchen, Pool) that smoothly scroll to the respective section, and open the Lightbox view when any photo is clicked."*

**Outcome & Agent Reasoning:**  
- Built `src/components/PhotoTourModal.tsx` matching the reference screenshot.
- Added smooth scrolling to category anchors, body scroll locking, and Escape key listener.

### Prompt 5.2: Screen 3 — Full-Screen Lightbox Viewer
> **Prompt:**  
> *"Recreate the Lightbox view as shown in the reference screenshot on Page 2. It must display a single large photo on a dark backdrop with smooth slide/fade animations (Framer Motion), circular left/right navigation arrows, keyboard navigation (ArrowLeft, ArrowRight, Escape), photo counter (e.g. 3 / 16), room captions, and a thumbnail scrubber strip at the bottom."*

**Outcome & Agent Reasoning:**  
- Built `src/components/LightboxModal.tsx` with bidirectional slide physics, keyboard listener, and thumbnail strip.

---

## Stage 6: Production Scaling Architecture & AI Subagent Configs

### Prompt 6.1: High-Level Architecture Design & Deliverable Assets
> **Prompt:**  
> *"Design a high-level architecture for an Airbnb-scale vacation-rental marketplace handling 100M+ daily requests. Detail frontend (ISR, Edge CDN), API Gateway, Core Microservices (Listing, Booking Saga, Dynamic Pricing), Search & Availability (Elasticsearch, Redis Bitmaps), Storage (Sharded PostgreSQL Aurora, Kafka), and Multi-Region Kubernetes Deployment. Export vector SVG, high-res PNG, and PDF files, and embed an interactive viewer in the application."*

**Outcome & Agent Reasoning:**  
- Generated `architecture-diagram.svg`, `architecture-diagram.png`, and `architecture-diagram.pdf`.
- Created comprehensive documentation in `ARCHITECTURE.md`.
- Integrated `src/components/ArchitectureModal.tsx` in the web application for interactive inspection.

### Prompt 6.2: Sub-Agent & Skill Configuration
> **Prompt:**  
> *"Define the sub-agent and skill configuration files under `.agents/` and `.skills/` to document the specialized AI roles used for UI precision, system architecture, code quality, and accessibility standards."*

**Outcome & Agent Reasoning:**  
- Created `.agents/ui-specialist-agent.md`, `.agents/architecture-agent.md`, `.agents/accessibility-agent.md`, `.agents/code-quality-agent.md`.
- Created `.skills/airbnb-design-system/SKILL.md` and `.skills/scaling-architecture/SKILL.md`.

---

## Stage 7: Quality Assurance, Verification & Packaging

### Prompt 7.1: Build Verification & Bundle Creation
> **Prompt:**  
> *"Run production build to ensure 0 TypeScript or styling errors. Package all code, architecture diagrams, prompt logs, and sub-agent configs into a clean submission zip file."*

**Outcome & Agent Reasoning:**  
- Verified build succeeded with exit code 0.
- Packaged clean, complete submission archive.
