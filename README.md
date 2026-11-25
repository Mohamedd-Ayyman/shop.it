<div align="center">

# 🛍️ Shop.it

**A full-stack e-commerce platform with a customer storefront, real-time notifications and a complete admin back office.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

</div>

---

## 📖 Overview

**Shop.it** is a production-style online store built on the MERN stack. Customers can browse a product catalogue, manage a cart and wishlist, apply coupons, check out and track their orders. Administrators manage products, categories, orders and users from a dedicated dashboard with analytics. Order and stock updates reach users live over WebSockets.

The backend uses a **feature-based layered architecture** (routes → controllers → services → repositories → models), so each domain can be developed, tested and scaled on its own.

## ✨ Features

### 🛒 Storefront
- Product listing with search, filtering and pagination (debounced search input)
- Product detail pages with ratings and customer reviews
- Persistent **cart** and **wishlist**
- **Coupon codes** at checkout
- Order history and order detail tracking
- Profile management, plus forgot/reset password flows

### 🧑‍💼 Admin Dashboard
- **Analytics** overview of sales, orders and customers
- Full CRUD for **products** and **categories**
- **Order management** with status updates
- **User management**
- Protected by role-based access control (RBAC)

### ⚡ Platform
- **Real-time notifications** with Socket.IO
- JWT **access and refresh tokens**
- Request validation with `express-validator`
- Hardened API: `helmet`, CORS allow-list, request size limits, global and auth-specific **rate limiting**
- Centralised error handling and a `/api/v1/health` endpoint
- Lazy-loaded routes, skeleton loaders, error boundaries and empty states on the client

## 🏗️ Architecture

```
shop.it/
├── client/                     # React 18 + Vite SPA
│   └── src/
│       ├── app/                # App shell & route definitions (lazy-loaded)
│       ├── features/           # Feature modules: auth, products, cart, checkout,
│       │                       #   orders, wishlist, profile, admin/*
│       ├── components/         # Header, Footer and reusable UI kit
│       ├── layouts/            # Main / Auth / Admin layouts
│       ├── router/             # ProtectedRoute & AdminRoute guards
│       ├── services/           # Axios API client & Socket.IO client
│       └── store/              # Redux Toolkit slices
└── server/                     # Express REST API
    ├── features/               # auth, users, products, categories, cart,
    │                           #   orders, reviews, coupons, notifications, analytics
    │   └── <feature>/          # Routes → Controller → Service → Repository → Model
    └── shared/
        ├── config/             # Env config & database seeder
        ├── middleware/         # auth, rbac, validate, rate limiters, error handlers
        └── utils/              # JWT, password hashing, socket helpers
```

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Redux Toolkit, React Router, Tailwind CSS, Radix UI, Axios, React Hot Toast, Lucide Icons |
| **Backend** | Node.js, Express, Mongoose, JWT, bcrypt, express-validator, Helmet, express-rate-limit, Morgan |
| **Database** | MongoDB |
| **Real-time** | Socket.IO |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB, running locally or on Atlas

### 1. Clone the repository
```bash
git clone https://github.com/Mohamedd-Ayyman/shop.it.git
cd shop.it
```

### 2. Set up the backend
```bash
cd server
cp .env.example .env      # then fill in your values
npm install
npm run seed              # optional: load sample data
npm run dev               # http://localhost:5000
```

### 3. Set up the frontend
```bash
cd ../client
npm install
npm run dev               # http://localhost:3000  (proxies /api and /socket.io to :5000)
```

### Environment variables (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | API port (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Secrets for signing access and refresh tokens |
| `JWT_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` | Token lifetimes (e.g. `15m` / `7d`) |
| `CORS_ORIGIN` | Allowed frontend origin |

## 🔌 API Overview

All endpoints are versioned under `/api/v1`.

| Resource | Base path |
|---|---|
| Auth | `/auth` |
| Users | `/users` |
| Products | `/products` |
| Categories | `/categories` |
| Cart | `/cart` |
| Orders | `/orders` |
| Reviews | `/reviews` |
| Coupons | `/coupons` |
| Notifications | `/notifications` |
| Admin (RBAC protected) | `/admin/*` |

## 👤 Author

**Mohamed Ayman**, Full-Stack Developer · [GitHub](https://github.com/Mohamedd-Ayyman)
