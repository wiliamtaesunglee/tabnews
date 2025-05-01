import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString()
  const [version] = await database.query('SHOW server_version;').then(result => result.rows)
  const [maxConnections] = await database.query("SHOW max_connections;").then(result => result.rows)

  const dbName = process.env.POSTGRES_DB
  const [connections] = await database.query({
    text: "SELECT count(*)::int AS connections FROM pg_stat_activity WHERE datname = $1",
    values: [dbName]
  }).then(result => result.rows)

  const body = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version.server_version,
        max_connections: parseInt(maxConnections.max_connections),
        open_connections: connections.connections
      }
    }
  }
  response.status(200).json(body)
}

export default status
