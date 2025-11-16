import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const databaseConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: parseInt(process.env.PG_PORT),
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
