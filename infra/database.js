import { Client } from "pg";

export async function query(queryObj) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
  })
  client.connect()
  const result = await client.query(queryObj)
  await client.end()
  return result;
}

export default {
  query
}


