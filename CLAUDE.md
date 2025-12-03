# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Milkyano Barber Web application - a modern booking platform for Fadedlines Barbershop. The application enables customers to view barber profiles, browse services, and book appointments through integration with Square API.

## Common Development Commands

```bash
# Install dependencies (uses Yarn, not npm)
yarn install

# Start development server (runs on port 5173)
yarn dev

# Build for production (runs TypeScript compiler first, then Vite)
yarn build

# Run ESLint
yarn lint

# Preview production build
yarn preview
```

## High-Level Architecture

### Technology Stack
- **React 18.2** with TypeScript (strict mode enabled)
- **Vite 5.2** for build tooling
- **Tailwind CSS** + SCSS for styling
- **Radix UI/Shadcn** for UI components
- **React Router DOM** for routing
- **React Hook Form + Zod** for forms and validation
- **Axios** for API communication
- **Square API** integration for bookings
- **Google Tag Manager** for analytics via vite-plugin-radar

### Project Structure

```
src/
├── components/
│   ├── analytics/        # PageTracker component
│   ├── book/            # 4-step booking flow components
│   ├── landing/         # Barber landing page components
│   ├── ui/              # Shadcn/Radix base components
│   └── web/             # Main website components
├── pages/
│   ├── landing/         # 11 individual barber landing pages
│   └── web/             # Main site pages
├── utils/               # API clients and utility functions
├── hooks/               # Custom hooks (event tracking, UTM tracking)
├── interfaces/          # TypeScript interfaces
└── constants/           # Event and localStorage key constants
```

### Critical Architectural Patterns

#### 1. Dual Routing Pattern
Routes exist in two forms for analytics tracking:
- Standard routes: `/barbers`, `/book/services`
- Meta-prefixed routes: `/meta/barbers`, `/meta/book/services`

Both route sets are duplicated in `routes.tsx` and render the same components. The `generateRoute()` helper function in booking components handles path construction based on whether URL contains `/meta` prefix.

#### 2. Barber-Specific Route Generation
Each of the 11 barbers has 5 routes:
- Landing page: `/{barber-name}`
- Service selection: `/{barber-name}/book/services`
- Appointment: `/{barber-name}/book/appointment`
- Contact info: `/{barber-name}/book/contact-info`
- Thank you: `/{barber-name}/book/thank-you`

Routes are programmatically generated in `routes.tsx` using arrays of barber names mapped to components.

#### 3. State Management via localStorage
No Redux/Context. Booking flow uses localStorage for state persistence:
- `bookedItems`: Selected services and barber info
- Flow moves through 4 steps, each reading/writing to localStorage
- Data cleared on thank you page or page refresh

#### 4. API Architecture
Two API client patterns coexist:
- `apiClients.ts`: Main axios instance (`apiSquare`) with Square API headers
- `barberApi.ts`: Service functions for Square endpoints (bookings, availability)
- `newApi.ts`: Alternate/updated endpoints

All API calls use custom headers:
- `x-api-key`: Square API authentication (from env)

### Key Application Features

#### Multi-Step Booking Flow
1. **BookList** (`/book/services`): Select barber and services
2. **BookAppointment** (`/book/appointment`): Choose date/time from Square availability
3. **BookContactInfo** (`/book/contact-info`): Enter customer details, validate with Square
4. **ThankYou** (`/book/thank-you`): Confirmation with booking details

Booking logic:
- Availability fetched for 60 days (2 months × 30 days)
- Date selection uses `react-day-picker` with disabled dates
- Time slots grouped by morning/afternoon/evening
- Customer validation checks existing Square customers before booking

#### Analytics Integration
- GTM configured in `vite.config.ts` (ID: GTM-W94TJ64)
- Custom `PageTracker` component in App routes
- `useEventTracking` hook tracks page visits
- `utmTrackingHook` captures UTM parameters and stores in localStorage

#### Barber Landing Pages
11 individual landing pages in `pages/landing/`:
- Each barber has unique component (e.g., `JoshLanding.tsx`)
- Uses `LandingLayout` wrapper with `LandingHeader` and `LandingFooter`
- Images mapped in `BookList.tsx` via `barberImages` object

### Environment Configuration

Required environment variables (`.env`):
```bash
VITE_API_WEB_BASE_URL      # Backend API URL
VITE_API_KEY_SQUARE        # Square API authentication
VITE_SQUARE_LOCATION_ID    # Square location identifier
VITE_BASE_URL_MINIO        # Asset storage URL for images
VITE_DASHBOARD_KEY         # Dashboard access key
VITE_NEW_API               # Alternate API URL
```

### Build and Deployment

#### Docker Multi-Stage Build
1. **Build stage**: Node 20, runs `npm install` and `npm run build`
2. **Serve stage**: Nginx Alpine, serves from `/usr/share/nginx/html`
3. Custom `nginx.conf` configuration applied
4. Image: `aldovadev/barber-web:latest`

#### Path Aliasing
- `@/` resolves to `src/` directory (configured in both `vite.config.ts` and `tsconfig.json`)
- Use `@/` for all internal imports

### TypeScript Configuration

Strict mode enabled:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- Target: ES2020

Many booking components have ESLint suppressions at the top:
```typescript
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
```

### Important Gotchas

1. **Barber Images**: New barbers must be added to `barberImages` object in `BookList.tsx` with image imports
2. **Route Duplication**: Adding new routes requires both standard and `/meta` variants
3. **localStorage Keys**: Defined in `constants/localStorageKey.constants.ts` - use constants, not magic strings
4. **Booking State**: Always check localStorage for `bookedItems` before rendering booking flow components
5. **Date Handling**: Mix of `date-fns`, `dayjs`, and `moment-timezone` - check existing usage before importing new date library
