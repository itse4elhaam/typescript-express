import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DB_URL,
});

export async function dbConnect() {
  try {
    await client.connect();
  } catch (err) {
    console.error("DB connection error", err);
    process.exit(1);
  }
}

export const db = drizzle(client);
