# Smart Leads Dashboard

A professional Lead Management Dashboard built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## Features
- **JWT Authentication**: Secure login and registration with bcrypt password hashing.
- **Role-Based Access Control (RBAC)**: Different permissions for `Admin` and `Sales User` (e.g., only Admin can delete leads).
- **Leads Management (CRUD)**: Create, View, Update, and Delete sales leads.
- **Advanced Filtering & Search**: Combined filtering by status and source, with debounced search by name/email.
- **Backend Pagination**: Scalable data fetching with 10 records per page.
- **CSV Export**: Export all leads data to a CSV file.
- **Responsive UI**: Premium dashboard design with TailwindCSS, Framer Motion, and Dark Mode support.
- **Dockerized**: Easy setup using Docker Compose.

## Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Axios, React Hook Form, Zod, Lucide React, Framer Motion.
- **Backend**: Node.js, Express, TypeScript, Mongoose, JWT, Morgan, Helmet.
- **Database**: MongoDB.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional)

### Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd smart-leads-dashboard
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env # Update MONGODB_URI and JWT_SECRET
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Docker Setup
Run the entire stack with a single command:
```bash
docker-compose up --build
```

## API Documentation

### Auth Routes
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and get JWT.
- `GET /api/auth/me`: Get current user profile (Protected).

### Leads Routes
- `GET /api/leads`: Get leads with filters and pagination.
  - Query Params: `status`, `source`, `search`, `sort`, `page`.
- `POST /api/leads`: Create a new lead (Protected).
- `GET /api/leads/:id`: Get single lead details (Protected).
- `PUT /api/leads/:id`: Update lead (Protected).
- `DELETE /api/leads/:id`: Delete lead (Protected, Admin only).
- `GET /api/leads/export`: Download leads CSV (Protected).

## License
MIT
