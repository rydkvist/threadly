import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const threadRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.thread.findMany({
      where: {
        participants: {
          some: { userId: ctx.userId },
        },
      },
      include: {
        participants: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),
  create: protectedProcedure
    .input(z.object({ otherUsername: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const other = await ctx.db.user.findUnique({
        where: { username: input.otherUsername },
      });

      if (!other) throw new Error("User not found");

      const thread = await ctx.db.thread.create({
        data: {
          participants: {
            create: [{ userId: ctx.userId }, { userId: other.id }],
          },
        },
      });

      return thread;
    }),
});
