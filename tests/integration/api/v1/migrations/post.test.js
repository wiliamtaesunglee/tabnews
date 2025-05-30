

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


  expect(response.status).toBe(201);
  const body1 = await response.json();

  expect(Array.isArray(body1)).toBe(true);
  expect(body1.length).toBeGreaterThan(0);

  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "test",
      description: "test",
    })
  });

  expect(response1.status).toBe(200);
  const body2 = await response1.json();

  expect(Array.isArray(body2)).toBe(true);
  expect(body2.length).toBe(0);
})
