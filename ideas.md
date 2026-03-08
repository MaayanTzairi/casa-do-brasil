# CASA DO BRASIL — Hero Section Design Brainstorm

## Brand Guidelines (Fixed)
- **Colors:** White (#FFFFFF), Gold (RGB 185,161,103), Deep Red (RGB 98,7,14), Deep Bordeaux (RGB 62,4,9)
- **Font:** Heebo only — Black for headlines, Bold for subheads, Regular for body, Light for accents
- **Language:** English with Portuguese accents

---

<response>
<idea>
**Design Movement:** Brazilian Brutalism meets Luxury Editorial

**Core Principles:**
1. Raw typographic power — massive Heebo Black headlines that bleed off edges
2. Cinematic full-bleed photography with precise color grading toward bordeaux
3. Asymmetric tension — text and image in deliberate visual conflict
4. Negative space as a luxury signal

**Color Philosophy:**
White dominates (85%) as a luxury canvas. Deep bordeaux anchors the hero image. Gold appears only as a single accent line or word — never decorative, always purposeful. The contrast between cold white and warm bordeaux creates visceral tension.

**Layout Paradigm:**
Full-viewport hero with image occupying right 60%, text bleeding left into white space. Title letters are massive — "CASA" / "DO" / "BRASIL" stacked vertically in left margin, each word on its own line, tracking tight, weight Black. No centering anywhere.

**Signature Elements:**
1. A single thin gold horizontal rule (1px) cutting across the full width
2. The subtitle "Onde o Brasil vive" in Heebo Light italic, gold color, floating below the main title
3. Navigation in Heebo Regular, ultra-small caps, letter-spacing 0.3em

**Interaction Philosophy:**
On load: title words slide in from left with staggered delay (0ms, 120ms, 240ms). Image fades in from dark. Gold rule draws itself left-to-right. Everything feels inevitable, not playful.

**Animation:**
- Entry: staggered word reveal with Y-axis translate (40px → 0) + opacity
- Parallax: hero image moves at 0.4x scroll speed
- CTA hover: gold underline draws left-to-right in 200ms
- Nav hover: letter-spacing expands subtly

**Typography System:**
- H1: Heebo Black, 120-160px, line-height 0.9, letter-spacing -0.02em
- Subtitle: Heebo Light, 22px, letter-spacing 0.05em, gold color
- Nav: Heebo Regular, 11px, letter-spacing 0.25em, uppercase
- CTA: Heebo Bold, 13px, letter-spacing 0.2em, uppercase
</idea>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement:** Haute Cuisine Editorial — Vogue meets Churrascaria

**Core Principles:**
1. Magazine-grade layout with editorial grid breaks
2. Photography as the primary design element — everything else serves it
3. Controlled restraint — fewer elements, more impact
4. Typographic scale contrast as the main visual tool

**Color Philosophy:**
Pure white background. The hero image is the only color. Gold used exclusively for the subtitle script and CTA underlines. Deep bordeaux reserved for the bottom gradient overlay on the hero image.

**Layout Paradigm:**
Full-width hero image taking 90vh. Title "CASA DO BRASIL" overlaid in three lines, left-aligned, bottom-anchored within the image. White text on dark image area. Below the fold: clean white section begins.

**Signature Elements:**
1. Oversized title text with mixed weight — "CASA" in Heebo Light, "DO" in Heebo Black, "BRASIL" in Heebo Black — creating rhythm
2. A Portuguese script subtitle in gold beneath
3. Two CTA buttons: one filled bordeaux, one ghost/outline gold

**Interaction Philosophy:**
Scroll-triggered reveal. As user scrolls, the hero image subtly scales (1.0 → 1.05) creating depth. Title has a slow fade-up entrance. Everything breathes.

**Animation:**
- Page load: 800ms black screen → hero image crossfade
- Title: each word fades up with 150ms stagger
- Parallax on scroll: image moves slower than viewport
- CTA: bordeaux button fills from left on hover

**Typography System:**
- H1: Heebo Black + Light mix, 100-140px
- Subtitle: Heebo Light, italic feel via letter-spacing
- Nav: Heebo Regular, 12px, letter-spacing 0.2em
</idea>
<probability>0.07</probability>
</response>

<response>
<idea>
**Design Movement:** Cinematic Asymmetric Luxury — inspired by Framer premium templates

**Core Principles:**
1. Full-bleed cinematic hero with bordeaux color grade
2. Title typography as sculpture — each word is a visual object
3. White sections below hero feel like gallery walls
4. Motion is the differentiator — every element has a purpose-driven entrance

**Color Philosophy:**
The hero is dark and cinematic (bordeaux overlay on image). Below the hero, pure white takes over. Gold is used as the single accent color throughout — for borders, underlines, and the subtitle. This creates a dramatic transition from dark/cinematic to light/editorial.

**Layout Paradigm:**
Hero: full viewport, image fills entire screen with bordeaux gradient overlay. Title centered but with deliberate weight asymmetry. Below: white canvas with asymmetric content blocks.

**Signature Elements:**
1. Thin gold border frame inside the hero (inset 20px from edges) — a luxury framing device
2. Bull skull logo/icon in gold, centered above the title
3. Animated scroll indicator — thin gold line that pulses downward

**Interaction Philosophy:**
Premium micro-interactions: nav items have gold underline on hover that draws in. CTA buttons have a subtle shimmer effect. The hero image has a very slow Ken Burns zoom (120s duration) creating a living, breathing quality.

**Animation:**
- Load: logo appears first, then title words cascade down
- Ken Burns: 0.02x scale per second on hero image
- Gold frame: draws itself in on load (stroke-dashoffset animation)
- Scroll indicator: infinite pulse animation

**Typography System:**
- H1: Heebo Black, 110-150px, white, tight tracking
- Subtitle: Heebo Light, 20px, gold, letter-spacing 0.08em
- Nav: Heebo Bold, 11px, white/gold, letter-spacing 0.3em
</idea>
<probability>0.09</probability>
</response>

---

## Selected Approach: **Cinematic Asymmetric Luxury** (Response 3)

This approach best matches the reference image and the premium Framer-grade standard requested. The combination of:
- Full-bleed cinematic hero with bordeaux color grade
- Massive Heebo Black typography as sculpture
- Gold accent frame as luxury device
- Purpose-driven entrance animations

...creates the exact level of visual impact and brand premium that CASA DO BRASIL demands.
