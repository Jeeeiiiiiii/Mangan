import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '../auth'
import { headers } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTRPCContext = async () => {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList
  })

  return {
    session,
    prisma,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create()

export const router = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  })
})