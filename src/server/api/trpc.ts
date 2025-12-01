import { initTRPC, TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";
import { parseAuthToken } from "../auth/parseAuthToken";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  const userId = parseAuthToken(token);

  return {
    db,
    userId,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const enforceAuthGuard = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceAuthGuard);

export const publicProcedure = t.procedure;
