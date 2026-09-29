# Airbnb Clone — Romantic Jacuzzi 1BHK Candolim | Mirashya UG10

A pixel-perfect, production-quality clone of the Airbnb property listing page, built as part of the **Playpower Take-Home Task**.

Includes exact visual fidelity, behavioral parity, motion animations, accessibility, the two mandatory overlay views (**Photo Tour** and **Lightbox**), AI sub-agent/skill configurations, and a comprehensive high-level **Production Scaling Architecture Diagram** (SVG, PNG, and PDF).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 🌟 What Has Been Built

### 1. Screen 1: Listing Page (Desktop View)
- **Top Navigation Bar**: Authentic Airbnb logo, search bar pill (*Anywhere | Any week | Add guests*), language/currency switcher, and interactive user dropdown.
- **Top Banner**: Quick access button to launch the **System Architecture Diagram** modal.
- **Header & Title**: Property title, review score (4.92 ★), 128 reviews anchor, location anchor, Share modal, and animated Wishlist Save heart button.
- **Hero Photo Mosaic (5 Photos)**: Signature 50% left main photo and 2x2 grid on right with hover zoom/dim effects, and a floating *"Show all 16 photos"* trigger.
- **Sticky Navigation Bar**: Smoothly animates into view when scrolling past the hero grid, featuring section tabs (*Photos, Amenities, Reviews, Location*) and a mini reservation button.
- **Property Highlights**: Guest favourite banner with gold laurels, Superhost badge, private jacuzzi, dedicated workspace, self check-in, pool access, and free cancellation highlights.
- **Where You'll Sleep**: Visual bedroom and living room cards with bed configurations and photos.
- **About This Space**: Short description with a *"Show more"* modal dialog detailing the space, guest access, and housekeeping.
- **Amenities**: Top 10 amenities preview + *"Show all 35 amenities"* searchable categorized modal dialog.
- **Interactive Dual-Month Calendar**: Interactive date range selector with minimum stay validation, night calculation, and clear dates button.
- **Reviews Section**: Detailed rating breakdown bars (*Cleanliness: 4.9, Accuracy: 4.9, Check-in: 5.0, Communication: 5.0, Location: 4.8, Value: 4.9*), real guest reviews, and a searchable review modal dialog.
- **Location & Map**: Interactive Candolim coastline map with Airbnb pin and travel times to nearby landmarks.
- **Host Profile**: Mirashya Homes host credentials, response metrics, and an interactive *"Message Host"* dialog.
- **Things to Know**: House rules, safety & property, and cancellation policy modals.
- **Sticky Booking Card**:
  - Live dynamic price calculation (₹5,200/night × N nights, cleaning fee, service fee, 12% GST, weekly stay discount).
  - Guest counter popover (Adults, Children, Infants, Pets with 3 guests limit).
  - Signature Airbnb gradient Reserve button.
  - Interactive reservation confirmation with confetti celebration and receipt details!

---

### 2. Screen 2: Photo Tour View (Overlay 1)
- Recreates the exact full-screen gallery shown in the reference screenshot.
- Top navigation bar with back arrow (`←`), title, share, and save buttons.
- Sticky category pills bar (*All photos, Living room, Jacuzzi & Bathroom, Bedroom, Kitchen & Dining, Pool & Outdoors*) with smooth scroll navigation.
- Photos grouped by room with room descriptions and responsive grids.
- Clicking **any photo** launches the Lightbox viewer at that specific photo index!

---

### 3. Screen 3: Lightbox Viewer (Overlay 2)
- Recreates the exact single-photo viewer shown in the reference screenshot.
- Full-screen clean dark backdrop.
- Large photo center stage with smooth spring-based slide/fade transitions (`framer-motion`).
- Left and right navigation arrows.
- Full keyboard navigation:
  - `ArrowLeft` (←): Previous photo
  - `ArrowRight` (→): Next photo
  - `Escape` (Esc): Exit lightbox
- Live counter (e.g. `3 / 16`) and room caption details.
- Interactive bottom thumbnail strip preview.

---

### 4. Production Architecture Scaling Diagram
- **Vector SVG**: [`architecture-diagram.svg`](./architecture-diagram.svg)
- **High-Res Image (PNG)**: [`architecture-diagram.png`](./architecture-diagram.png)
- **Document (PDF)**: [`architecture-diagram.pdf`](./architecture-diagram.pdf)
- **Interactive In-App Viewer**: Click *"View Architecture Diagram"* in the top banner of the app.
- **System Documentation**: Comprehensive breakdown in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

### 5. AI Sub-Agents & Prompts
- Subagent configurations:
  - [`.agents/ui-specialist-agent.md`](./.agents/ui-specialist-agent.md)
  - [`.agents/architecture-agent.md`](./.agents/architecture-agent.md)
  - [`.agents/accessibility-agent.md`](./.agents/accessibility-agent.md)
  - [`.agents/code-quality-agent.md`](./.agents/code-quality-agent.md)
- Custom skills:
  - [`.skills/airbnb-design-system/SKILL.md`](./.skills/airbnb-design-system/SKILL.md)
  - [`.skills/scaling-architecture/SKILL.md`](./.skills/scaling-architecture/SKILL.md)
- Complete prompt sequence:
  - [`AI_PROMPTS_SEQUENCE.md`](./AI_PROMPTS_SEQUENCE.md)

---

## 📦 Submission Deliverables
- [`airbnb-clone-submission.zip`](./airbnb-clone-submission.zip) contains the full codebase, architecture diagrams (PNG, PDF, SVG), prompt sequence, and sub-agent configs.
