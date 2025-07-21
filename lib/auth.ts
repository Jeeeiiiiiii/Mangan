import { betterAuth } from "better-auth"
// TODO: Implement or import a DynamoDB adapter for better-auth
// import { dynamoDbAdapter } from "better-auth/adapters/dynamodb" (if available)

export const auth = betterAuth({
  // database: dynamoDbAdapter(dynamoDbClient, { ... }) // Example usage
  // TODO: Implement the DynamoDB adapter for better-auth
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
})

export type Session = typeof auth.$Infer.Session