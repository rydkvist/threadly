# Threadly

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

# Implementation approachs

- Using Next.js to facilitate setting up an end-to-end full-stack app. I would revisit this in the aspect of scaling and setup a Node.js backend instead, to  would like to implement a clearer separation of concerns for developers working between the frontend and the backend.
  - Login page is client-side driven to speed up the building of this app. A more performant approach could be to have a hybrid where as much as resonable is rendered on the server, and keep the client-side JS code minimal so the user has less JS to load on their browser and receive a faster time to interactive (TTI) experience. Rendering UI on the server helps also minimizing the UI layout shifts for the user when loading the page.
  - Using OpenAI's GPT 5.1 model to speed-up building the UI flows and focus on the integration itself.
- Using shadcn to speed up the process of building the UI components, it integrates well with an App Router Next.js app where the components have server components support out of the box, and have the "use client" directive by default on client components. It also provides many accessibility (A11Y) attributes of the box, keeping the app compliant to the WCAG 2.1 AA standard (EU directive from June 2025).
- Using SQLite as my RDBMS since it's a lightweight approach that doesn't require setting up any infrastructure for the scope of this application.
- From a domain aspect, I'll be using "/messages" as the user front-facing domain, rather than /threads that seems more technical. This can help keep a better separation between "Message" and "Thread" models on the backend.
- We may have to keep the messages root page using the "use client" directive to allow for a more real-time experience on live updates from other chats