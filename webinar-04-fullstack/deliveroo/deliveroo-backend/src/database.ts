import { Pool } from 'pg';
import fs from 'fs';

const passwordFilePath = process.env.DB_PASSWORD_FILE!;
if (!fs.existsSync(passwordFilePath)) {
  throw new Error(`Password file not found at path: ${passwordFilePath}`);
}

const dbPassword: string = fs.readFileSync(process.env.DB_PASSWORD_FILE as string, 'utf8').trim();

// Create and export the pool
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: dbPassword,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
});

export default pool;
