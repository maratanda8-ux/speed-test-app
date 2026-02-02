# SPEEDCHECK BABA 

A modern, client-side internet speed test application built with React and Vite. Test your connection's download and upload speeds with real-time visualization and accurate measurements.

## Features
- **Real-time speed testing** with live progress updates every 100-200ms
- **Parallel upload workers** (8 concurrent streams) for maximum bandwidth saturation
- **Animated SVG gauge** displaying current speed dynamically
- **Live history chart** tracking speed fluctuations during tests
- **Network info display** showing ISP provider and IP address
- **Responsive design** with glassmorphism aesthetics that works on mobile and desktop
- **Fully client-side** - no backend required, works entirely in the browser

## Tech Stack
- React 19 + Vite 7
- Chart.js + react-chartjs-2 for data visualization
- Vanilla CSS with glassmorphism and gradient themes
- XMLHttpRequest for precise progress tracking


## 🔬 How It Works
- **Download Test**: Uses Cloudflare CDN endpoints with cache-busting to measure download speeds over 15 seconds
- **Upload Test**: Runs 8 parallel workers uploading 10MB blobs each to maximize bandwidth utilization, with automatic endpoint fallback
- **Measurement**: Calculates speed based on cumulative bytes transferred over elapsed time, updated in real-time

## 📝 Notes
- Tests rely on public endpoints (Cloudflare, httpbin.org, postman-echo.com, reqres.in)
- Results may vary based on endpoint availability, CORS policies, and server load
- Network info is fetched from `ipapi.co` when a test starts
- Both download and upload tests run for 15 seconds each

## 📚 Documentation
See [Working.md](Working.md) for detailed implementation breakdown and architecture.

