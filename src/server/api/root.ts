import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { messageRouter } from "./routers/message";
import { threadRouter } from "./routers/thread";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  thread: threadRouter,
  message: messageRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
