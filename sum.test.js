// ✅ Test Unitaire suivant AAA
const sum = require('./sum');

describe('sum function', () => {
  test('adds 2 + 3 to equal 5', () => {
    // Arrange
    const a = 2;
    const b = 3;

    // Act
    const result = sum(a, b);

    // Assert
    expect(result).toBe(5);
  });

  test('adds 0 + 3 to equal 3', () => {
    expect(sum(0, 3)).toBe(3);
  });

  test('adds 7 + 0 to equal 7', () => {
    expect(sum(7, 0)).toBe(7);
  });
});