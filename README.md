# Threadly

A lightweight messaging app built with the following tech stack:
* Next.js App Router
* React (client and server components)
* tRPC (type-safe API between client and server)
* Prisma + SQLite
* Tailwind CSS
* shadcn/ui
* Server actions for authentication flow

# Features

This project implements the expected following functionality:

### 1. Login

* Users can sign in with a username and password
* A simple flow for creating an account is available from the login page

### 2. Messaging

* Users see a list of their message threads
* Users can start a new thread with any existing user
* Each thread shows messages in chronological order
* The newest message always appears at the bottom
* Messages update automatically without refreshing the page (via polling)

### 3. Setup instructions

* The README includes steps on how to run the project locally
* The app provides a built-in seed mechanism to generate demo users


# Running the project locally

### 1. Install dependencies

```sh
npm install
```

### 2. Generate the Prisma client

```sh
npx prisma generate
```

### 3. Create the database schema

```sh
npx prisma db push
```

This creates a local SQLite database (`threadly.db`) based on the Prisma schema.

### 4. Start the development server

```sh
npm run dev
```

The app will be available at:

```
http://localhost:3000
```


# Seeding demo users

There is **no CLI seeding required**.

You can seed everything from the login page:

1. Open `http://localhost:3000`
2. Press **“Seed 8 demo users”**
3. Eight demo users will be created, all with password `12345`

### Accounts created (examples)

```
alice / 12345
bob / 12345
charlie / 12345
diana / 12345
eric / 12345
… and a few more
```

# Testing the app with 2 users

A good way to test exchanging messages between 2 users:

1. Visit start page and click the button "**Seed 8 demo users**"
2. Log in as **Alice** (*or with your own account*) in your main browser
3. Start a thread with **Bob**
4. Open an incognito window
5. Log in as **Bob**
6. Exchange messages between the two windows

This demonstrates threads, participants, and polling-based live message updates.

# Rationale behind stack

### Next.js (App Router)

Used to quickly deliver both the frontend and backend in one project. Since this was a time-boxed assignment, the built-in server components, file-based routing and server actions helped move faster.

### React + TypeScript + Tailwind

Covers the required frontend stack and enables quick UI iteration with strict typing

### shadcn/ui

Used purely for speed. It provides accessible and pre-styled components that work well with App Router, letting me focus on the features rather than styling.

### tRPC

Chosen to satisfy the requirement for an end-to-end type-safe API between backend and frontend. tRPC removes API schema duplication, speeds up iteration and provides excellent developer experience for small to medium services.

### SQLite (Prisma ORM)

The assignment requires an RDBMS, and SQLite is the most lightweight database that requires no infrastructure, no Docker and no external services. I think it's great for a local-only demo. In real deployments I would pick Postgres.

### Prisma

Good developer experience for modeling relational data quickly. Also made the seeding simple

### Polling for “real-time” feel

The requirements ask for new messages to appear without refreshing the page.
Polling is pragmatic for this assignment because it avoids the additional infrastructure needed for WebSockets in App Router (which I attempted at first and abandoned after figuring out that it would require more than 5 hours... 😅). It still delivers a responsive experience.