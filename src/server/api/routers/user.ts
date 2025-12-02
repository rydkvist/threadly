import z from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: input,
      });

      return {
        token: `user-${user.id}`,
        userId: user.id,
      };
    }),
});
