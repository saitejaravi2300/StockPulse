# Stock_Pulse

Stock_Pulse is a small full-stack application for tracking stock alerts, portfolios and news. The frontend is a Vite + React client and the backend is an Express API that uses MySQL (AWS RDS) for persistence.

## Table of Contents

- Project Structure
- Overview
- Setup
  - Backend
  - Client
- Running the App
- API Endpoints
- Notes

## Project Structure

```
Stock_Pulse/
	README.md
	client/
		eslint.config.js
		index.html
		package.json
		postcss.config.js
		README.md
		tailwind.config.js
		vite.config.js
		public/
		src/
			App.css
			App.jsx
			main.jsx
			Styles.css
			components/
				Layout.jsx
				Topbar.jsx
			pages/
				alerts.css
				Alerts.jsx
				auth.css
				dashboard.css
				Dashboard.jsx
				landing.css
				Landing.jsx
				Login.jsx
				news.css
				News.jsx
				portfolio.css
				Portfolio.jsx
				profile.css
				Profile.jsx
				Signup.jsx
	stock-backend/
		server.js
		servr.js
		servnano
		auth.js
		authController.js
		package.json
		config/
			db.js
		controllers/
			alertsController.js
			authController.js
		routes/
			alerts.js
			auth.js
			portfolio.js
			stocks.js
```

## Overview

- Frontend: React + Vite. UI components live under `client/src` and pages under `client/src/pages`.
- Backend: Node + Express API in `stock-backend`. Uses MySQL (`mysql2`) and JWT for auth.

## Setup

Prerequisites: `node` (>=16 recommended), `npm`.

Backend

- Navigate to `stock-backend` and install dependencies:

```
cd stock-backend
npm install
```

- Database: This project expects a MySQL database. Connection details are currently in `stock-backend/config/db.js`. For production use, replace credentials with environment variables or a secure secret store.

- Start the backend:

```
node server.js
```

Client

- Navigate to `client` and install dependencies:

```
cd client
npm install
```

- Start the development client (runs Vite dev server):

```
npm run dev
```

## Running the App (quick)

1. Start backend: `cd stock-backend && node server.js` (server listens on port 3000)
2. Start client: `cd client && npm run dev` (Vite default port 5173)

Open the frontend in the browser and it will call the backend API under `/api/*` routes.

## API Endpoints (high level)

- `GET /` - backend root (health quick check)
- `GET /health` - health check
- `POST /api/auth/*` - authentication routes
- `GET/POST /api/alerts` - alerts routes
- `/api` - stock related endpoints in `stock-backend/routes/stocks.js`
- `POST /api/portfolio` and friends - portfolio routes
Refer to the route files in `stock-backend/routes/` for full details.
