# Zomato AI Recommender — Frontend

A modern, responsive React frontend for the Zomato AI Restaurant Recommendation Service. Users select their dining preferences and receive personalized restaurant recommendations powered by Google Gemini AI, sourced from real Zomato data (41,000+ restaurants).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## Features

- **Preferences Form** — Select location, cuisine type, budget range, and minimum rating from dynamically populated dropdowns (loaded from the backend dataset)
- **AI-Powered Results** — Get ranked restaurant recommendations with ratings, cost, cuisine tags, and location details
- **Responsive Design** — Clean, mobile-friendly UI styled with Tailwind CSS and Zomato's signature red branding
- **Loading States** — Animated spinner with contextual messaging while the AI processes your request
- **Error Handling** — Graceful error banners when the backend is unreachable or the request fails
- **Vite Dev Proxy** — API calls are proxied to the FastAPI backend during development, no CORS hassle

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI library |
| [TypeScript 5.9](https://www.typescriptlang.org) | Type safety |
| [Vite 7](https://vite.dev) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [Axios](https://axios-http.com) | HTTP client for API calls |

---

## Project Structure

```
zomato-recommendation-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.tsx     # Animated loading indicator
│   │   └── RestaurantCard.tsx     # Restaurant result card with rating, price, cuisine tags
│   ├── pages/
│   │   ├── PreferencesPage.tsx    # Main form — location, cuisine, budget, rating
│   │   └── RecommendationsPage.tsx# Results view with restaurant cards
│   ├── services/
│   │   └── api.ts                 # Axios client, TypeScript interfaces, API functions
│   ├── App.tsx                    # Root component — view routing (form → loading → results)
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Tailwind imports & global styles
├── vite.config.ts                 # Vite config with Tailwind plugin & API proxy
├── tsconfig.json
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js** >= 20.19 (recommended) or >= 22.12
- **Backend** running on `http://localhost:8000` (see the [backend repo](https://github.com/YOUR_USERNAME/zomato-recommendation-backend))

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/zomato-recommendation-frontend.git
cd zomato-recommendation-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

> The Vite dev server proxies all `/api/*` requests to `http://localhost:8000`, so make sure the FastAPI backend is running first.

### 4. Build for production

```bash
npm run build
```

The optimized output will be in the `dist/` folder, ready for static hosting.

### 5. Preview the production build

```bash
npm run preview
```

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Vite dev server with HMR |
| `build` | `npm run build` | Type-check & build for production |
| `preview` | `npm run preview` | Locally preview the production build |
| `lint` | `npm run lint` | Run ESLint across the codebase |

---

## API Integration

The frontend communicates with the FastAPI backend through two endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/metadata` | Fetches available cities, cuisines, and total restaurant count |
| `POST` | `/api/recommend` | Sends user preferences, returns AI-ranked restaurant recommendations |

### Request Example (`POST /api/recommend`)

```json
{
  "place": "Koramangala",
  "cuisine": "Italian",
  "price": "medium",
  "rating": 4.0
}
```

### Response Example

```json
{
  "summary": "AI-generated recommendation summary...",
  "restaurants": [
    {
      "name": "ECHOES Koramangala",
      "cuisines": "Chinese, American, Continental, Italian",
      "rating": 4.7,
      "cost_for_two": 750,
      "city": "Koramangala 5th Block",
      "price_category": "medium"
    }
  ],
  "filtered_count": 10
}
```

---

## Configuration

The API proxy target is configured in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

To point to a different backend URL, update the `target` value.

---

## Related Repository

- **Backend**: [zomato-recommendation-backend](https://github.com/YOUR_USERNAME/zomato-recommendation-backend) — FastAPI + Gemini AI + Hugging Face Zomato dataset

---

## License

This project is for educational and demonstration purposes.
