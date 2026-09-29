---
name: airbnb-design-system
description: Design tokens, layout conventions, and component guidelines for building pixel-perfect Airbnb clones.
---

# Airbnb Design System Guide

This skill provides the technical guidelines for replicating Airbnb's interface conventions:

## 1. Color Palette
- **Brand Primary (Rausch)**: `#FF385C`
- **Dark Neutral (Heading & Text)**: `#222222`
- **Medium Neutral (Subtitles & Icons)**: `#717171`
- **Light Neutral (Borders & Dividers)**: `#DDDDDD` / `#EBEBEB`
- **Surface Neutral (Backgrounds)**: `#F7F7F7`
- **Accent Coral/Orange**: `#FC642D`
- **Accent Teal (Babu)**: `#00A699`

## 2. Typography
- Hierarchy:
  - Property Title: `text-2xl` to `text-[26px]`, `font-semibold`, tracking tight.
  - Section Headers: `text-xl` to `text-[22px]`, `font-semibold`.
  - Subsection / Card Titles: `text-base`, `font-semibold`.
  - Body Text: `text-[15px]`, `text-gray-700`, line height 1.6.
  - Meta/Caption Text: `text-xs` to `text-sm`, `text-gray-500`.

## 3. Hero Mosaic Grid
- Proportions: 50% left main photo, 50% right 2x2 grid.
- Border radius: outer boundary `rounded-2xl`, individual images cropped neatly.
- "Show all photos" floating trigger on bottom right with 9-dot icon.

## 4. Modal Overlays
- **Photo Tour**: Full-screen modal with sticky category navigation bar.
- **Lightbox**: Dark `#000000`/95 backdrop with centered image, keyboard navigation (left/right/escape), and bottom thumbnail scrubber.
