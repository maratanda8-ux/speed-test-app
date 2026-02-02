# How It Works: SPEEDCHECK BABA

This document explains the current implementation of the SPEEDCHECK BABA speed test app.

## Overview
SPEEDCHECK BABA is a fully client-side React application. It measures download and upload throughput using public endpoints and visualizes the results with a gauge and a live chart.

## Core Flow
1. User starts the test.
2. Download test runs for a fixed 15-second window.
3. Upload test runs for a fixed 15-second window using parallel workers.
4. Results are displayed along with optional network info.

## Speed Test Logic (`src/utils/speedTest.js`)

### Download Test
- Uses **Cloudflare CDN endpoints** with varying file sizes (5MB to 100MB).
- Cycles through multiple URLs to maintain consistent throughput.
- Downloads using `XMLHttpRequest` with `onprogress` to track byte deltas.
- Updates speed every ~100ms based on cumulative bytes over total elapsed time.
- Runs for **15 seconds** and stops automatically.
- Cache-busting query parameters prevent cached results from skewing measurements.

### Upload Test
- Uses **8 concurrent workers** for maximum bandwidth saturation.
- Each worker uploads a **10MB random binary blob** repeatedly during the test window.
- Fallback to multiple endpoints: `httpbin.org/post`, `postman-echo.com/post`, and `reqres.in/api/users`.
- Automatically switches endpoints if one fails or is slow.
- Tracks upload progress per-worker to avoid race conditions.
- Updates aggregated speed every ~200ms across all workers.
- Runs for **15 seconds** and terminates all workers gracefully.

### Network Info
- Fetches IP and ISP provider data from `https://ipapi.co/json/` in the background when a test starts.
- Displays provider info and IP address in the results panel when available.

## State Management (`src/hooks/useSpeedTest.js`)
- `status` tracks the flow: `idle → downloading → uploading → complete` or `error`.
- `speedHistory` is reset for each phase and drives the live chart.
- `downloadSpeed` and `uploadSpeed` are updated from callbacks provided by the speed test utility.
- Handles abort/cancel operations cleanly.

## UI Layer
- `App.jsx` orchestrates the layout, state rendering, and conditional sections.
- `Gauge.jsx` renders an animated SVG gauge using the active speed value.
- `LineChart.jsx` renders a live chart using `chart.js` and `react-chartjs-2`.
- Glassmorphism design with gradient backgrounds and smooth animations.

## Responsiveness & Performance
- Flexbox and grid ensure layout adapts across screen sizes.
- Mobile breakpoints adjust padding, font sizes, chart height, and button width.
- Chart animation is disabled during live updates to keep the UI responsive.
- Parallel upload workers maximize bandwidth utilization on fast connections.
