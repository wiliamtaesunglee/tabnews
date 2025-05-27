

test("POST to /api/v1/status should create a migration", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "test",
      description: "test",
    })
  });

  expect(response.status).toBe(200);
})
