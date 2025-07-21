import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../server'
// @ts-ignore: Ignore missing type declarations for aws-sdk/lib-dynamodb
import { GetCommand, PutCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const DISHES_TABLE = process.env.DISHES_TABLE ?? 'Dishes'
const VOTES_TABLE = process.env.VOTES_TABLE ?? 'DailyVotes'

export const dishesRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Scan all dishes (for demo, use scan; for prod, use query with indexes)
    if (!ctx.docClient) {
      throw new Error('DynamoDB DocumentClient not found in context')
    }
    const result = await ctx.docClient.send(new QueryCommand({
      TableName: DISHES_TABLE,
      IndexName: 'dailyVoteCount-index', // If you have a GSI for sorting
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: { '#type': 'type' },
      ExpressionAttributeValues: { ':type': 'dish' },
      ScanIndexForward: false // Descending order
    }))
    return result.Items || []
  }),

  vote: protectedProcedure
    .input(z.object({ dishId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayStr = today.toISOString().split('T')[0]
      const userId = ctx.session.user.id
      // Check if user already voted for this dish today
      const voteKey = `${userId}#${input.dishId}#${todayStr}`
      const voteResult = await ctx.docClient.send(new GetCommand({
        TableName: VOTES_TABLE,
        Key: { voteKey },
      }))
      if (voteResult.Item) {
        throw new Error('You have already voted for this dish today')
      }
      // Create vote
      await ctx.docClient.send(new PutCommand({
        TableName: VOTES_TABLE,
        Item: {
          voteKey,
          userId,
          dishId: input.dishId,
          voteDate: todayStr,
        },
      }))
      // Increment dish vote count
      await ctx.docClient.send(new UpdateCommand({
        TableName: DISHES_TABLE,
        Key: { id: input.dishId },
        UpdateExpression: 'SET dailyVoteCount = if_not_exists(dailyVoteCount, :zero) + :inc',
        ExpressionAttributeValues: { ':inc': 1, ':zero': 0 },
      }))
      return { success: true }
    }),

  getUserVotes: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split('T')[0]
    const userId = ctx.session.user.id
    // Query for today's votes by user
    const result = await ctx.docClient.send(new QueryCommand({
      TableName: VOTES_TABLE,
      IndexName: 'userId-voteDate-index', // If you have a GSI for this
      KeyConditionExpression: 'userId = :userId AND voteDate = :today',
      ExpressionAttributeValues: { ':userId': userId, ':today': todayStr },
    }))
    return result.Items || []
  })
})