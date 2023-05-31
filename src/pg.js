import pkg from 'pg';
import * as dotenv from 'dotenv'

const { Client } = pkg;
dotenv.config();


const dbConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

const pg_client = new Client(dbConfig);
pg_client.connect();
export default pg_client