
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGLO_DB_URL);
export const db = client.db("skill-swap");

export const auth = betterAuth({

  // এখানে নতুন দুটি property যোগ করবে
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    process.env.NEXT_PUBLIC_BASE_URL,
  ],

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "client",
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 60 * 60,
      strategy: "jwt",
    },
  },

  plugins: [jwt()],

});
