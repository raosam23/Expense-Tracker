# Expense Tracker (Work in Progress)

A full-stack app to manage your income and expenses.

## Features

- Add and delete transactions
- View your total balance
- User authentication

### Tech Stack

- Next.js
- Tailwind CSS
- Prisma

## Installation

### 1.Clone the Repository

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

Create a .env.local file in the root directory and add the following:
```text
DATABASE_URL=your_postgres_or_mongo_url
NEXT_PUBLIC_APP_NAME=Expense Tracker
```
Replace `your_postgres_or_mongo_url` with your database url

### 4. Run the development server
```bash
npm run dev
# or
pnpm dev
```

The app will be running on //localhost:3000.