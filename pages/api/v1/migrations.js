import database from 'infra/database'
import migrationRunner from 'node-pg-migrate'
import { join } from 'path'

const migrationConfig = {
  dir: join('infra', 'migrations'),
  direction: 'up',
  verbose: true,
  migrationsTable: 'pgmigrations',
  dryRun: false,
}

async function migrations(request, response) {
  const dbClient = await database.getClient()

  const { method } = request
  if (method === 'POST') {
    const executedMigrations = await migrationRunner({
      dbClient,
      ...migrationConfig,
    })
    await dbClient.end()

    let status = 200

    if (executedMigrations.length > 0) {
      status = 201
    }

    return response.status(status).json(executedMigrations)
  }

  if (method === 'GET') {
    const pendingMigrations = await migrationRunner({
      dbClient,
      ...migrationConfig,
      dryRun: true,
    })
    await dbClient.end()

    return response.status(200).json(pendingMigrations)
  }

  return response.status(405).end()
}

export default migrations
