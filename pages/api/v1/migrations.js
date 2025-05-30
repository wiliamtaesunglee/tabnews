import migrationRunner from 'node-pg-migrate'
import { join } from 'path'

const migrationConfig = {
  databaseUrl: process.env.DATABASE_URL,
  dir: join('infra', 'migrations'),
  direction: 'up',
  verbose: true,
  migrationsTable: 'pgmigrations',
  dryRun: false,
}

async function migrations(request, response) {
  const { method } = request
  if (method === 'POST') {
    const executedMigrations = await migrationRunner(migrationConfig)

    let status = 200

    if (executedMigrations.length > 0) {
      status = 201
    }

    return response.status(status).json(executedMigrations)
  }

  if (method === 'GET') {
    const pendingMigrations = await migrationRunner({
      ...migrationConfig,
      dryRun: true,
    })
    return response.status(200).json(pendingMigrations)
  }

  return response.status(405).end()
}

export default migrations
