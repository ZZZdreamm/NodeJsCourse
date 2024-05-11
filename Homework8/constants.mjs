import pkg from "pg";
const { Pool } = pkg;

// Database connection with PostgreSQL database
// Database created with "docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 2022:5432 postgres" command
const DEFAULT_POOL = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "postgres",
  port: 2022,
});

export { DEFAULT_POOL };