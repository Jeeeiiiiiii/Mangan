import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../server'
import { PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

const RESERVATIONS_TABLE = process.env.RESERVATIONS_TABLE || 'Reservations'

export const reservationsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Query all reservations for the user
    const userId = ctx.session.user.id
    const result = await ctx.docClient.send(new QueryCommand({
      TableName: RESERVATIONS_TABLE,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
    }))
    return result.Items || []
  }),

  create: protectedProcedure.input(z.object({
    dishId: z.string(),
    quantity: z.number(),
    reservationDate: z.string(),
    status: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id
    const id = `${userId}#${input.dishId}#${input.reservationDate}`
    await ctx.docClient.send(new PutCommand({
      TableName: RESERVATIONS_TABLE,
      Item: {
        id,
        userId,
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }))
    return { success: true }
  }),

  update: protectedProcedure.input(z.object({
    id: z.string(),
    status: z.string(),
  })).mutation(async ({ ctx, input }) => {
    await ctx.docClient.send(new UpdateCommand({
      TableName: RESERVATIONS_TABLE,
      Key: { id: input.id },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':status': input.status, ':updatedAt': new Date().toISOString() },
    }))
    return { success: true }
  }),

  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.docClient.send(new DeleteCommand({
      TableName: RESERVATIONS_TABLE,
      Key: { id: input.id },
    }))
    return { success: true }
  })
}) 