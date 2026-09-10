---
name: Institutional Civic Trust
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#43474f'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#476083'
  on-secondary: '#ffffff'
  secondary-container: '#bdd6ff'
  on-secondary-container: '#445d80'
  tertiary: '#381300'
  on-tertiary: '#ffffff'
  tertiary-container: '#592300'
  on-tertiary-container: '#d8885c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#afc8f0'
  on-secondary-fixed: '#001c3a'
  on-secondary-fixed-variant: '#2f486a'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#723610'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
  surface-canvas: '#F4F6F9'
  surface-card: '#FFFFFF'
  border-subtle: '#CBD5E1'
  border-strong: '#94A3B8'
  text-primary: '#1E293B'
  text-secondary: '#4B5563'
  text-muted: '#64748B'
  status-success: '#1B7A43'
  status-danger: '#B3261E'
  status-warning: '#B45309'
  status-info: '#003366'
  gov-saffron: '#FF8514'
typography:
  display-lg:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  container-max: 1280px
---

## Brand & Style

This design system delivers a standardized, resilient, and civic-grade digital interface engineered for public administration, cooperative societies, and national service delivery. The overarching aesthetic is institutional, authoritative, utilitarian, and uncompromisingly accessible. Every visual element projects statutory reliability, constitutional dignity, and transparency.

The target demographic spans citizens across urban, rural, and regional cooperatives, administrative officers, and society executives. The interface avoids ephemeral consumer trends, excessive white space, floating labels, gradient meshes, decorative glassmorphism, or playful pill buttons. Instead, it relies on structured data density, visible boundaries, boxy grids, clear semantic contrast, and unambiguous transactional states adhering to GIGW (Guidelines for Indian Government Websites) and WCAG 2.1 AA/AAA compliance.

## Colors

The color palette reinforces sovereignty, formal authority, and functional legibility:

- **Primary (`#003366`)**: Deep Navy Blue serves as the primary visual anchor for headers, primary action buttons, key brand banners, and active navigation indicators.
- **Secondary / Dark Navy (`#001F3F`)**: Utilized for top administrative mastheads, persistent institutional utility headers, and active state highlights requiring higher contrast.
- **Neutral Dark (`#1E293B`)**: A deep slate charcoal for primary textual content, ensuring stark contrast against bright backgrounds without the eye-fatigue of pure `#000000`.
- **Surfaces**: Primary application canvas uses Light Institutional Off-White (`#F4F6F9`) to define tabular surfaces, side panels, and content cards rendered in Pure White (`#FFFFFF`).
- **Semantic Accents**:
  - `status-success` (`#1B7A43`): Approved registrations, compliant statuses, verified credentials.
  - `status-danger` (`#B3261E`): Rejections, critical alerts, validation failures.
  - `status-warning` (`#B45309`): Pending reviews, required actions, non-fatal notifications.
  - `gov-saffron` (`#FF8514`): Restricted to national emblem accents, tri-color strips, and institutional notifications.

No gradients or translucent overlays are permitted. All background-to-text pairings must maintain a minimum contrast ratio of 4.5:1 for body copy and 7:1 for data tables.

## Typography

Noto Sans is selected as the universal font across headlines, body, and data displays. Its wide language script coverage, open counters, and high x-height guarantee legibility across varied device resolutions, high-DPI desktop screens, and multi-script Indian language localized views.

Typographic Rules:
- Headings are weighted at 600 or 700 to establish unambiguous content hierarchies.
- Static input labels, table column headers, and status badges utilize `label-md` or `label-lg` with medium to bold weights to prioritize scanability.
- Body text remains strictly left-aligned; centered body copy is prohibited in administrative screens.
- Line heights are tuned for readability during prolonged data-entry and application review tasks.

## Elevation & Depth

This design system deliberately eschews soft ambient blurs, dramatic drop shadows, and modern glassmorphism in favor of crisp borders, structural framing, and low-contrast surface tints:

- **Flat Framing**: Visual hierarchy is created through solid surface separation (`#FFFFFF` cards on `#F4F6F9` canvas) bounded by a crisp 1px solid border (`#CBD5E1`).
- **Elevated Modals and Popovers**: Floating dialogs, datepickers, and dropdown menus utilize an architectural hard-edge shadow: `0px 4px 6px -1px rgba(0, 31, 63, 0.12), 0px 2px 4px -2px rgba(0, 31, 63, 0.08)`.
- **Focus Rings**: Keyboard focus indicator is mandatory for all interactive nodes: a double-ring boundary with 2px solid `#003366` and a 2px outer offset white line.
- **Section Dividers**: 1px solid horizontal and vertical rules using `#D1D5DB` to separate related administrative panels.

## Shapes

Shapes across the system are predominantly rectilinear and geometric, delivering a formal, dependable, and utilitarian personality:

- **Base Radius**: Standard interactive elements (buttons, text fields, notification alerts, badges) have a slight corner radius of `2px` to `4px` (`roundedness: 1`).
- **Cards and Data Containers**: Sharp or subtle 4px radius with visible border strokes.
- **Prohibited**: Circular chips, pill-shaped buttons, and exaggerated border curves are explicitly disallowed to prevent consumerization of institutional government workflows.

## Components

### Buttons
- **Primary**: Solid Deep Navy (`#003366`) fill, pure white text, 4px border radius, 12px 24px padding (`label-lg`). Hover state deepens to `#001F3F`. Active state has a 1px inset ring.
- **Secondary / Outline**: Transparent fill, 1.5px solid `#003366` border, `#003366` text. Hover state applies `#F4F6F9` surface fill.
- **Destructive**: Solid `#B3261E` fill with white text, used strictly for critical actions (e.g., Application Rejection, Revocation).
- **Dimensions**: Fixed heights of 44px (Standard) and 36px (Compact/Table action).

### Input Fields & Form Controls
- **Labels**: Static, visible labels positioned strictly above the input field in `label-md` weight. Asterisk in `#B3261E` denotes mandatory requirements. No floating labels.
- **Inputs**: 40px height, `#FFFFFF` fill, 1px solid `#94A3B8` border, 4px radius. 
- **Focus State**: `#003366` 2px border with explicit outline offset.
- **Helper / Error Text**: Displayed directly underneath the field. Errors render in `#B3261E` with an inline alert icon.

### Selection Controls
- **Checkboxes & Radios**: Standard 18x18px square (checkbox) and circle (radio) with 1.5px `#4B5563` border. Checked states feature solid `#003366` fill with high-contrast white checkmark or center dot.

### Data Tables
- **Grid Layout**: Explicit 1px borders (`#CBD5E1`) separating columns and rows.
- **Header Row**: `#001F3F` or `#003366` background with bold white text, or deep gray `#F1F5F9` with `#1E293B` text for subsidiary panels.
- **Row Striping**: Alternating row backgrounds (Row A: `#FFFFFF`, Row B: `#F8FAFC`).
- **Row States**: Hover state renders subtle highlight (`#EDF2F7`). Selected state renders light blue tint (`#E0EDFB`) with 2px navy left-edge border indicator.
- **Pagination**: Rectangular numbered buttons with current page marked in solid navy fill.

### Status Badges & Chips
- Rectangular with 2px radius, uppercase `label-sm`, 4px 8px padding.
- **Approved / Active**: Light green tint (`#DCFCE7`) background with `#1B7A43` text and border.
- **Pending / In Review**: Light amber tint (`#FEF3C7`) background with `#B45309` text and border.
- **Rejected / Terminated**: Light red tint (`#FEE2E2`) background with `#B3261E` text and border.

### Government Header & Footer
- **National Top Strip**: 32px height, tricolor micro-stripe at topmost edge, dark navy background with bilingual switchers, text size toggles (A-, A, A+), and screen reader accessibility links.
- **Masthead**: Ashoka Lion Capital emblem positioned on the left alongside the Devanagari and English designation: "Ministry of Cooperation / सहकारिता मंत्रालय".
- **Footer**: Multi-column deep navy (`#001F3F`) layout containing hyperlinked listings for RTI disclosures, Citizen Charter, Grievance Redressal (CPGRAMS), Web Information Manager, Privacy Policy, Terms of Service, 1800 Toll-Free Helplines, and the National Informatics Centre (NIC) attribution stamp.