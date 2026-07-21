# Project Guide

## Overview

This repository contains a single-page portfolio for Mary Jo Suficiencia, an AI Video Specialist. The visual direction is a high-end cinematic studio: restrained dark surfaces, warm gold light, oversized editorial typography, and purposeful motion.

## Architecture

- `src/routes/index.tsx` contains the one-page React experience, content data, reusable display components, portfolio filtering, mobile navigation, reveal behavior, and contact-form state.
- `src/routes/__root.tsx` defines global metadata, SEO fields, favicon links, and the document shell.
- `src/styles.css` contains the complete visual system, layout, responsive breakpoints, and animation rules.
- `public/__forms.html` registers the contact form with Netlify's build bot.
- `public/demo-reel-poster.svg` is the lightweight hero fallback visual.
- `public/favicon.svg` is the branded site icon.
- `content/` is inherited from the scaffold but is not used by the primary one-page experience.

## Conventions

- Keep page copy and repeating content in the typed arrays near the top of `src/routes/index.tsx`.
- Reuse `ButtonLink` and `SectionIntro` rather than creating one-off button or heading patterns.
- Preserve semantic section headings, labels, focus states, and reduced-motion behavior.
- Use Lucide icons already available in the project instead of hand-authored interface SVGs.
- Keep visual changes token-driven. Update the variables in `:root` before adding isolated color, spacing, radius, or shadow values.
- Animate only `opacity` and `transform` for scroll and hover effects.
- Maintain the mobile-first collapse rules in the `1050px` and `760px` media queries.

## Netlify Forms

The React contact form posts URL-encoded data to `/__forms.html`. Any field added to the visible form must also be added to `public/__forms.html`, and the `contact` form name must match in both files. The `.netlify/features/netlify-forms` marker enables the feature for the project environment.

## Asset Replacement

- The hero expects `public/demo-reel.mp4` and falls back to `public/demo-reel-poster.svg`.
- The About section currently renders a styled circular placeholder directly in CSS. When the final headshot arrives, move it into `public/` and replace that placeholder with an optimized image while retaining the existing circular frame.
- Portfolio cards intentionally use generated gradient placeholders until approved project media is available.

## Validation

The automated pipeline handles dependency installation and build validation. Avoid committing generated build output such as `dist/`, `.tanstack/`, or local Netlify runtime files.
