import migrationRunner from 'node-pg-migrate'
import { join } from 'path'

async function migrations(request, response) {
  const { method } = request
  if (method === 'POST') {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dr6yRun: false,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',

    })
    return response.status(200).json(migrations)
  }

  if (method === 'GET') {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',

    })
    return response.status(200).json(migrations)
  }

  return response.status(405).end()
}

export default migrations
