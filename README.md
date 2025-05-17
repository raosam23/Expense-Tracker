# Expense Tracker (Work in Progress)

A full-stack app to manage your income and expenses.

## Features

- Add and delete transactions
- View your total balance
- User authentication

### Tech Stack

- Next.js
- Tailwind CSS
- PostgreSQL with Prisma

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/raosam23/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Install the dependencies

```bash
npm install
#or
pnpm install
```

### 3. Set Up Environment Variables

This app uses PostgreSQL as the database.  
Set up the required environment variables in the appropriate files:

#### `.env`
```env
DATABASE_URL=your_postgresql_connection_string
```
- `DATABASE_URL`: Replace `your_postgresql_connection_string` with your actual PostgreSQL database URL. Prisma requires this to be in `.env`, not `.env.local`.

#### `.env.local`
```env
NEXTAUTH_SECRET=your_strong_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Expense Tracker
```
- `NEXTAUTH_SECRET`: A secure random string (you can generate one using `openssl rand -base64 32`)
- `NEXTAUTH_URL`: The base URL of your app (e.g., `http://localhost:3000` for local development)
- `NEXT_PUBLIC_APP_NAME`: Publicly accessible app name.

### 4. Prisma Setup

This project uses Prisma with PostgreSQL.

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

The app will be running on `http://localhost:3000`.
