import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ threadId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: { threadId: input.threadId },
        orderBy: { createdAt: "asc" },
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
    }),
  send: protectedProcedure
    .input(
      z.object({
        threadId: z.number(),
        text: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.message.create({
        data: {
          text: input.text,
          threadId: input.threadId,
          senderId: ctx.userId,
        },
      });
    }),
});
