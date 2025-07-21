import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '../auth'
import { headers } from 'next/headers'
import { reservationsRouter } from './routers/reservations'
import { dishesRouter } from './routers/dishes'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' })
const docClient = DynamoDBDocumentClient.from(dynamoDbClient)

export const createTRPCContext = async () => {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList
  })

  return {
    session,
    docClient,
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

export const appRouter = router({
  reservations: reservationsRouter,
  dishes: dishesRouter,
})