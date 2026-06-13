---
version: alpha
name: Ludora Dark Signal
description: A dark, high-contrast launch system with a vivid yellow accent and restrained, technical UI rhythm.
colors:
  primary: "#f2c12e"
  secondary: "#666666"
  tertiary: "#374151"
  neutral: "#080808"
  surface: "#111111"
  on-surface: "#efefef"
  error: "#ef4444"
  border-subtle: "#ffffff12"
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 700
    lineHeight: "41.6px"
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: Inter
    fontSize: 27px
    fontWeight: 700
    lineHeight: "32.6px"
    letterSpacing: "-0.026em"
  headline-sm:
    fontFamily: Inter
    fontSize: 23px
    fontWeight: 600
    lineHeight: "28px"
    letterSpacing: "0em"
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: "24px"
    letterSpacing: "0em"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: "30px"
    letterSpacing: "0em"
  body-md:
    fontFamily: Inter
    fontSize: 16.8px
    fontWeight: 400
    lineHeight: "28.6px"
    letterSpacing: "0em"
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: "22px"
    letterSpacing: "0em"
  label-lg:
    fontFamily: Inter
    fontSize: 12.8px
    fontWeight: 700
    lineHeight: "16px"
    letterSpacing: "0.08em"
  label-md:
    fontFamily: Inter
    fontSize: 12.8px
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.04em"
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 600
    lineHeight: "14px"
    letterSpacing: "0.06em"
rounded:
  none: 0px
  sm: 2px
  md: 4px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 28px
  lg: 36px
  xl: 52px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "13px 28px"
    height: "43px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "13px 28px"
    height: "43px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "12px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "6px 10px"
---

# Ludora Dark Signal

## Overview

Ludora presents as a focused, high-contrast launch page for a technical audience: developers, Linux enthusiasts, and power users who value clarity over ornament. The mood is dark, precise, and slightly cinematic, with a strong sense of restraint interrupted only by a bright yellow accent for emphasis. Overall density is moderate: the page uses generous vertical breathing room while keeping the core message tightly centered and easy to scan.

## Colors

- **Primary (#f2c12e):** A vivid amber-yellow used for the logo mark, release badge, primary call-to-action, and key links. It acts as the system’s only strong emotional color, signaling action and brand recognition.
- **Secondary (#666666):** A muted gray for secondary button text and less prominent utility copy. It supports hierarchy without competing with the accent.
- **Tertiary (#374151):** A dark slate border tone used to separate structural containers subtly in the dark UI. It keeps edges visible without creating harsh outlines.
- **Neutral (#080808):** The near-black base background that defines the entire interface. This deep tone gives the page a dramatic, premium, and highly legible canvas.
- **Surface (#111111):** A slightly lifted dark surface for cards and inputs when needed. It preserves the monochrome feel while allowing a small amount of layering.
- **On-surface (#efefef):** The near-white text color used for main headlines and core copy. It delivers strong contrast against the dark base.
- **Error (#ef4444):** Reserved for destructive or invalid states; it is not visually dominant in the source but provides a clear semantic fallback.
- **Border subtle (#ffffff12):** A faint translucent white edge used on low-emphasis controls. It is ideal for dark-mode outlines that should remain nearly invisible until needed.

## Typography

Inter is the dominant typeface throughout the page, with a clean neo-grotesk feel that matches the product’s technical positioning. Headings are heavy and compact, using 700 weight for the most important titles and 600 weight for secondary headings, with negative letter-spacing to create a tighter, more engineered look. Body copy stays readable and open at 16.8px with generous line height, while labels and buttons rely on small, bold, often letter-spaced text to read like controls rather than prose.

The system favors strong hierarchy: `headline-display` and `headline-lg` for hero messaging, `headline-md` and `headline-sm` for sectional emphasis, and `body-md` / `body-sm` for explanatory text. Labels use uppercase-friendly spacing conventions; the observed UI leans into compact all-caps navigation and button text, so uppercase treatment should be used sparingly but consistently for actions, badges, and metadata.

## Layout & Spacing

The layout is centered and editorial, with a single-column hero composition that prioritizes message, call to action, and supporting proof points. Content is framed by large amounts of negative space, which makes the page feel expansive even though the actual information architecture is simple. Spacing follows a restrained rhythm built around 8px, 16px, 28px, 36px, and 52px increments, with larger jumps reserved for section separation and hero breathing room.

Container widths should stay reasonably narrow for long-form hero content so lines remain readable and the page feels deliberate rather than sprawling. Buttons and small utility groups should maintain tight internal padding, while sections should use generous top/bottom spacing to preserve the page’s calm, launch-focused rhythm.

## Elevation & Depth

The interface is intentionally flat, relying on contrast and subtle borders instead of heavy shadows or layered elevation. Depth is communicated through tonal shifts in surfaces, faint outlines, and the occasional soft glow on the primary accent. The result is a crisp, modern dark UI where hierarchy comes from brightness and spacing rather than material shadow.

Use shadows sparingly; the source style shows a small accent glow in limited contexts, but most elements remain shadow-free. This makes the design feel controlled, lightweight, and technically confident.

## Shapes

The shape language is minimal and slightly sharp. Corners are mostly small-radius, with `rounded.sm` on buttons and `rounded.lg` on cards to keep the UI feeling precise rather than soft. Pills and badges can use `rounded.full` when a compact, status-like shape is needed, but overall the system should avoid overly rounded or playful geometry.

## Components

Buttons are the most visually expressive controls. `button-primary` should use the yellow primary fill, dark text, bold label typography, and compact vertical padding for a crisp call-to-action. `button-secondary` should be transparent with a faint border and muted text, acting as a lower-emphasis alternative. `button-link` should remain text-only, yellow, and underlined for inline navigation or supporting links.

Cards should remain dark, bordered, and understated, using `card` for grouped content without introducing heavy elevation. Inputs should follow the same dark surface language, with subtle borders and clear text contrast so they disappear until interaction. Chips and badges should be compact, pill-shaped, and accent-forward, used for status, release notes, or feature tags without competing with primary actions.

Navigation and utility links should be understated in gray at rest, with yellow reserved for active or important states. Lists and metadata rows should use thin separators or simple spacing rather than ornate dividers. If icons are used, they should be small, functional, and aligned to text baselines so the interface retains its disciplined, systems-oriented feel.

## Do's and Don'ts

- Do use the primary yellow sparingly for the strongest actions and key brand moments.
- Do keep most surfaces nearly black and rely on contrast for hierarchy.
- Do use Inter with bold, compact headings and airy body copy.
- Do preserve the centered, spacious hero composition for top-level landing content.
- Don't introduce bright secondary accent colors that dilute the brand signal.
- Don't add heavy shadows, gradients, or glossy effects; keep the UI mostly flat.
- Don't use large corner radii or soft, playful shapes on core controls.
- Don't let body text get too dense; maintain generous line height and clear spacing.