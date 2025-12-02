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
Polling is pragmatic for this assignment because it avoids the additional infrastructure needed for WebSockets in App Router (which I attempted at first and abandoned after figuring out that it would require more than 5 hours *hehe*...). It still delivers a responsive experience.


# Implementation approaches

* I used Next.js App Router to move quickly and keep both backend and frontend logic in one place. For a real production service I would separate a dedicated Node backend and have Next.js focus on frontend delivery. This creates cleaner boundaries between domains and makes scaling easier.

* The login flow uses client components for simplicity. In a production environment I would lean on hybrid rendering, where most UI is server-rendered and only interactive elements run client-side. This keeps JavaScript bundles smaller and improves page load performance.

* I used OpenAI’s GPT 5.1 model as a coding assistant for generating UI scaffolding so I could focus on wiring the app together, messaging logic and data flows.

* shadcn/ui was used to speed up development of accessible and consistent UI components. It integrates well with App Router conventions and helps maintain WCAG 2.1 AA accessibility standards with minimal overhead.

* SQLite was chosen for convenience and simplicity since this assignment runs fully locally. For a multi-user production environment I would migrate to Postgres.

* The backend domain uses separate Thread and Message models. The UI uses `/messages` as the user-facing route instead of `/threads` to keep the terminology more intuitive for users while still maintaining a clean domain model internally.

* Real-time updates use a polling approach. I started with WebSockets but switched to polling because socket support with App Router adds infrastructure requirements and would have required more time to implement cleanly.

* Authentication uses server actions so the server can set httpOnly cookies without exposing additional API routes. This keeps the flow secure and lightweight.

# Future improvements

If continuing the project, I would explore:

* Migrating from polling to WebSockets or server-sent events for true real-time communication
* Adding optimistic UI updates for chat input
* Look into optimizing requests so similar date is re-utilized between components
* Improving error handling and form validation
* Introducing unit and integration tests for critical flows
* Persisting user presence indicators (online, typing etc)
