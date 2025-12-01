import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { observable } from "@trpc/server/observable"
import { EventEmitter } from "events"

const ee = new EventEmitter()

export const messageRouter = createTRPCRouter({
    list: protectedProcedure
        .input(z.object({ threadId: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.message.findMany({
                where: { threadId: input.threadId },
                orderBy: { createdAt: "asc" },
            })
        }),
    send: protectedProcedure
        .input(
            z.object({
                threadId: z.number(),
                text: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const msg = await ctx.db.message.create({
                data: {
                    text: input.text,
                    threadId: input.threadId,
                    senderId: ctx.userId,
                },
            })

            ee.emit("newMessage", msg)
            return msg
        }),
    onNew: protectedProcedure
        .input(z.object({ threadId: z.number() }))
        .subscription(({ input }) => {
            return observable((emit) => {
                const handler = (msg: any) => {
                    if (msg.threadId === input.threadId) emit.next(msg)
                }

                ee.on("newMessage", handler)

                return () => {
                    ee.off("newMessage", handler)
                }
            })
        }),
})
