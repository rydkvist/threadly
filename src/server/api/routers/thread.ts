import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"

export const threadRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.thread.findMany({
            where: {
                participants: {
                    some: { userId: ctx.userId },
                },
            },
            include: {
                participants: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })
    }),
    create: protectedProcedure
        .input(
            z.object({
                username: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const otherUser = await ctx.db.user.findUnique({
                where: { username: input.username },
            })

            if (!otherUser) {
                throw new TRPCError({ code: "NOT_FOUND", message: "User not found" })
            }

            return await ctx.db.thread.create({
                data: {
                    participants: {
                        create: [
                            { userId: ctx.userId },
                            { userId: otherUser.id },
                        ],
                    },
                },
            })
        }),
})
