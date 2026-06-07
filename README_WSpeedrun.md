# WSpeedrun Service

## Overview
WSpeedrun adalah backend berbasis NestJS yang menggunakan arsitektur microservice untuk mengelola platform speedrun game.

Project terdiri dari beberapa service:

- **authService**: autentikasi, registrasi, login, dan profil pengguna.
- **game-service**: manajemen game dan kategori speedrun.
- **runs-service**: manajemen run dan komentar.

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- MySQL / MariaDB
- JWT Authentication

---

## Service Architecture

### Auth Service
Fitur:
- Register user
- Login user
- Generate JWT Token
- Get profile user

Endpoint utama:
- POST `/auth/register`
- POST `/auth/login`
- GET `/users/:id/profile`

### Game Service
Fitur:
- CRUD Game
- CRUD Category
- Role-based authorization

Endpoint utama:
- GET `/games`
- GET `/games/:id`
- POST `/admin/games`
- PATCH `/admin/games/:id/update`
- DELETE `/admin/games/:id`
- GET `/categories/:id`
- POST `/admin/categories`

### Runs Service
Fitur:
- Submit run
- Verifikasi run
- Komentar pada run
- Filter berdasarkan user dan kategori

Endpoint utama:
- GET `/runs/:id`
- GET `/runs/:id/category`
- GET `/runs/:id/user`
- POST `/runs`
- POST `/comments`
- DELETE `/comments/:id`

---

## Database

### Auth Database

users
- user_id
- username
- email
- password
- country
- role

### Game Database

games
- game_id
- game_name
- description

run_categories
- run_category_id
- game_id
- run_category_name

### Runs Database

runs
- run_id
- run_category_id
- user_id
- vod_url
- run_duration
- submitted_at
- verified_at
- status

comments
- comment_id
- run_id
- user_id
- comment
- created_at

---

## Installation

```bash
npm install
```

### Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### Run Development

```bash
npm run start:dev
```

---

## Authentication

Gunakan JWT token yang diperoleh dari endpoint login.

Header:

```http
Authorization: Bearer <token>
```

---

## Future Improvements

- API Gateway
- Service-to-Service Authentication
- Docker Deployment
- Leaderboard
- Run Verification Workflow
- Integration Testing


## How To Run The Application

### 1. Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Buat file `.env` pada masing-masing service dan sesuaikan konfigurasi database serta JWT.

Contoh:

```env
DATABASE_URL="mysql://user:password@localhost:3306/wspeedrun"
JWT_SECRET="your-secret-key"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Database Migration

```bash
npx prisma migrate dev
```

### 6. Start Application

Development:

```bash
npm run start:dev
```

### 7. Verify Service

Buka endpoint API menggunakan Postman atau browser:

```http
GET /games
GET /runs
POST /auth/login
```
