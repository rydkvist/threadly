import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"

export const authRouter = createTRPCRouter({
    login: publicProcedure
        .input(
            z.object({
                username: z.string(),
                password: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { username: input.username },
            })

            if (!user || user.password !== input.password) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid login" })
            }

            // Ideally generate a JWT but simple is fine for this case
            return {
                token: `user-${user.id}`,
                userId: user.id,
            }
        }),
})
