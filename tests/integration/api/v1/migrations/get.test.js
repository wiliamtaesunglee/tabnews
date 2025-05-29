import database from 'infra/database'

const cleanSchema = async () => {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
}

beforeAll(cleanSchema)

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations")
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
})
