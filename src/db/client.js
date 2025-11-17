import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = new Pool(databaseConfig);

const connectDB = async () => {
  try {
    const client = await db.connect();
    console.log("PostgreSQL connected successfully.");
    client.release();
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

const closeDB = () => db.end();

export { connectDB, closeDB };
export default db;
