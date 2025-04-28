const calc = require("../../models/calc.js");

test("2 + 2 should return 5", () => {
  const result = calc.sum(2, 2);
  expect(result).toBe(4);
})

test("15 + 203 should return 218", () => {
  const result = calc.sum(15, 203);
  expect(result).toBe(218);
})


