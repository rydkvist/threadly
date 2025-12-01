import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        id: { not: ctx.userId },
      },
      select: {
        id: true,
        username: true,
      },
      orderBy: { username: "asc" },
    });
  }),
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.userId },
      select: {
        id: true,
        username: true,
      },
    });
  }),
});
