import sum from "../../src/js/sum"

describe('sum(a, b) = c: The sum of a and b should be c', () => {
  test('sum(1, 1) = 2: 1 + 1 = 2', () => {
    const result = sum(1, 1);

    expect(result).toBe(2);
  });

  test('sum(1, 2) = 3: 1 + 2 = 3', () => {
    const result = sum(1, 2);

    expect(result).toBe(3);
  });
});
