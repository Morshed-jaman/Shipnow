# ShipNow — Logistics Dashboard

<p align="center">
  A responsive, Figma-driven logistics dashboard built with Next.js, React, TypeScript, and Tailwind CSS.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000000" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=ffffff" alt="TypeScript strict mode">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=ffffff" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/Responsive-1440%20%7C%20768%20%7C%20375-22C55E" alt="Target responsive widths">
</p>

ShipNow is a frontend implementation of a logistics management platform based on supplied Figma designs. It covers login, operational analytics, shipment management, invoicing, and warehouse monitoring.

The interface targets desktop (`1440px`), tablet (`768px`), and mobile (`375px`) layouts. Components reflow and change interaction patterns at each target rather than simply scaling down.

> [!NOTE]
> ShipNow is frontend-only. It uses local mock data and simulated browser storage authentication. There is no backend, database, payment provider, or persistent shipment service.

## Links

- **Repository:** [github.com/Morshed-jaman/Shipnow](https://github.com/Morshed-jaman/Shipnow)
- **Live demo:** [shipnow-one.vercel.app](https://shipnow-one.vercel.app/)

## Highlights

- Six responsive screens based on supplied Figma frames
- Reusable, strictly typed UI and domain components
- Shipment table and grid views with filtering, sorting, selection, and pagination
- Multi-section shipment form validated with React Hook Form and Zod
- Data-driven dashboard and warehouse charts built with Recharts
- Responsive master-detail invoice workflow with computed totals
- Interactive warehouse freight, package-status, floor-map, filtering, and sorting controls
- Centralized semantic design tokens and dedicated mock-data modules
- Semantic HTML, alternative text, labelled controls, focus states, and accessible icon buttons

## Tech Stack

| Technology | Usage |
| --- | --- |
| **Next.js 16** | App Router, file-based routing, optimized images, and fonts |
| **React 19** | Component composition and state-driven interactions |
| **TypeScript** | Strict typing for components, forms, and mock data |
| **Tailwind CSS v4** | Responsive styling and CSS-first `@theme` tokens |
| **React Hook Form** | Shipment and login form state |
| **Zod** | Declarative validation and inferred form types |
| **Recharts** | Data-driven dashboard and warehouse charts |
| **Lucide React** | Consistent interface iconography |

## Application Routes

| Screen | Route | Main capabilities |
| --- | --- | --- |
| Login | `/login` | Validated email/password fields, visibility toggle, remember-me control, and simulated session creation |
| Dashboard | `/dashboard` | Responsive KPIs, charts, map, alerts, recent shipments, and activity |
| Shipments | `/shipments` | Table/grid views, company logos, search, status filters, sorting, selection, and pagination |
| New Shipment | `/shipments/new` | Sender/recipient, package, shipping, service, tracking, and validated submission fields |
| Invoices & Billing | `/invoices` | KPIs, sortable/filterable invoice list, responsive drill-down, line items, and calculated totals |
| Warehouse | `/warehouse` | Inventory/capacity charts, sortable storage, package filters, floor maps, and activity log |

The target responsive widths are:

| Desktop | Tablet | Mobile |
| :---: | :---: | :---: |
| `1440px` | `768px` | `375px` |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `20.9` or later (`22 LTS` recommended)
- npm `10` or later

### Installation

```bash
git clone https://github.com/Morshed-jaman/Shipnow.git
cd Shipnow
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route checks the simulated session and redirects to `/login` or `/dashboard`.

No environment variables are required.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimized production build and run TypeScript checks |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── app/
│   ├── globals.css              # Tailwind entry and @theme token bridge
│   ├── layout.tsx               # Root layout and font configuration
│   ├── login/                   # Public login route
│   └── (app)/                   # Authenticated route group
│       ├── dashboard/
│       ├── shipments/
│       │   └── new/
│       ├── invoices/
│       └── warehouse/
├── components/
│   ├── shell/                   # Sidebar, mobile drawer, navigation, profile, and promotion
│   ├── dashboard/               # Dashboard cards, charts, tables, and shared footer
│   ├── shipments/               # Shipment table, grid, filters, and pagination
│   ├── features/create-shipment/
│   ├── invoices/                # Invoice list and computed detail panel
│   ├── warehouse/               # Warehouse charts, table, map, and logs
│   └── ui/                      # Shared primitives
├── data/
│   ├── dashboard.ts
│   ├── shipments.ts             # 192 generated shipment records
│   ├── create-shipment.ts
│   ├── invoices.ts              # 11 seeded invoices and line items
│   └── warehouse.ts
├── lib/
└── tokens/
    └── tokens.ts                # Typed design-token source
```

Static application assets live in `public/`, including company logos, the John Doe avatar, warehouse activity icons, login photography, the sidebar promotion, and footer social icons.

## Core Features

### Responsive Shell

- Full labelled desktop sidebar
- Icon-only tablet rail with profile avatar
- Off-canvas mobile navigation drawer
- Page-owned headers and actions instead of a duplicated global toolbar
- Bottom-pinned promotional banner on full desktop navigation

### Shipment Management

- URL-synchronized table/grid switcher
- Sortable columns and grid ordering
- Search and status filters
- Checkbox selection and pagination
- Shared typed dataset with deterministic logo assignment

### Shipment Form

- Zod schema integrated with React Hook Form
- Sender and recipient contact sections
- Package dimensions, freight type, carrier, method, date, and notes
- Additional services and tracking preference controls
- Field-adjacent error messages and navigation after valid submission

### Invoices and Billing

- Searchable, filterable, sortable invoice list
- Real unchecked, indeterminate, and checked selection states
- Keyboard-selectable rows and responsive tablet/mobile drill-down
- Per-invoice line items with sortable Package Summary
- Line amount, subtotal, 8% tax, fee, and total calculated from data
- Mobile-specific reduced columns and compact billing layout
- Company-logo error fallback so a missing image never leaves a blank mark

### Dashboard and Warehouse Charts

- Recharts rather than chart screenshots
- Definite chart containers with responsive sizing safeguards
- Data stored separately from rendering components
- Warehouse inventory switches from vertical bars to horizontal mobile bars
- Capacity usage rendered as a data-driven donut

### Warehouse Operations

- Freight-type, package-status, and floor tabs
- Sortable storage table with a working floor filter
- Three distinct floor layouts with available/full shelf states
- Responsive package and activity logs using supplied icon assets

## Design System and Data

Typed tokens live in `src/tokens/tokens.ts`. Tailwind CSS v4 utilities are exposed through corresponding `@theme` declarations in `src/app/globals.css`. Components use semantic names for colors, typography, spacing, radii, and shadows.

Application content lives in `src/data/`. Shipment records, invoice details, chart series, form defaults, and warehouse data are kept separate from their rendering components.

## Accessibility

- Semantic `header`, `nav`, `main`, `table`, and `footer` structures
- Logical page and section headings
- Associated form labels and inline error descriptions
- Descriptive image alternative text
- Accessible names for icon-only buttons
- Visible keyboard focus indicators
- Keyboard-operable invoice rows and tabs
- Real DOM `indeterminate` state for partially selected tables

## Known Limitations and Assumptions

- **Frontend only:** Authentication uses `localStorage`; data and submissions are not persisted.
- **Displayed shipment totals:** The table displays `1,240` results and the grid displays `520` to match Figma copy, while both use 192 generated records.
- **Shipping methods:** The source transcription did not specify options, so the form uses Standard, Express, and Priority while preserving the required empty state.
- **Invoice KPI totals:** `350 / 120 / 80 / 245` are design labels and intentionally do not equal the 11 seeded invoices.
- **SmartAppliance logo:** The existing TechGear mark is reused because no dedicated SmartAppliance asset was supplied; failed logo requests fall back to the company initial.
- **Invoice search:** The page-level and table-level invoice searches share one query because separate scopes were not defined.
- **Warehouse freight tabs:** They update active UI state; separate freight-specific datasets were not supplied.
- **Warehouse filter:** The storage Filter control toggles Floor 1 rows.
- **Warehouse floors:** Floor 2 and Floor 3 use plausible mock layouts because only Floor 1 was specified in detail.
- **Status terminology:** Shipment table and grid views retain the different status labels in their source frames.
- **Image lint advisories:** Two shipment company-logo elements intentionally use native `<img>` markup, leaving two non-blocking Next.js lint advisories.

## Verification

Before handing off a change:

```bash
npm run lint
npm run build
```

The production build includes strict TypeScript validation. Responsive work should also be inspected at `1440px`, `768px`, and `375px`.

## Credits

- Design based on the Figma file supplied with the assignment
- Footer attribution **Peterdraw** retained from the design
- Icons provided by [Lucide](https://lucide.dev/)
- Charts built with [Recharts](https://recharts.org/)
