import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;
if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URL is not defined in .env");
}
const client = new MongoClient(databaseUrl);
const db = client.db();
export const auth = betterAuth({
   emailAndPassword: { 
    enabled: true, 
  }, 
    database: mongodbAdapter(db, {
        client
    }),
  //...
});