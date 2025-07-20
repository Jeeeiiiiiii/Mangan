import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../server'

export const dishesRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.dish.findMany({
      orderBy: { dailyVoteCount: 'desc' },
      include: {
        _count: {
          select: { votes: true }
        }
      }
    })
  }),

  vote: protectedProcedure
    .input(z.object({ dishId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Check if user already voted for this dish today
      const existingVote = await ctx.prisma.dailyVote.findFirst({
        where: {
          userId: ctx.session.user.id,
          dishId: input.dishId,
          voteDate: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
          }
        }
      })

      if (existingVote) {
        throw new Error('You have already voted for this dish today')
      }

      // Create vote and increment counter
      await ctx.prisma.$transaction([
        ctx.prisma.dailyVote.create({
          data: {
            userId: ctx.session.user.id,
            dishId: input.dishId,
            voteDate: new Date()
          }
        }),
        ctx.prisma.dish.update({
          where: { id: input.dishId },
          data: { dailyVoteCount: { increment: 1 } }
        })
      ])

      return { success: true }
    }),

  getUserVotes: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return ctx.prisma.dailyVote.findMany({
      where: {
        userId: ctx.session.user.id,
        voteDate: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      },
      include: { dish: true }
    })
  })
})