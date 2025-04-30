import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString()
  const [version] = await database.query('SHOW server_version;').then(result => result.rows)
  const [maxConnections] = await database.query("SHOW max_connections;").then(result => result.rows)
  const [connections] = await database.query("SELECT count(*)::int AS connections FROM pg_stat_activity;").then(result => result.rows)

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
