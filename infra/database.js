import { Client } from "pg";


export async function query(queryObj) {
  let client

  try {
    client = await getClient();

    const result = await client.query(queryObj)
    return result
  } catch (error) {
    console.error({ error })
  } finally {
    await client.end()
  }

}

async function getClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV !== "production" ? false : true
  })
  await client.connect();
  return client
}

export default {
  query,
  getClient
}


