import "../../polyfills/array/filter.js";

describe("Array.prototype.customFilter", () => {
  test("filters even numbers", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.customFilter((x) => x % 2 === 0);
    expect(result).toEqual([2, 4]);
  });

  test("uses thisArg correctly", () => {
    const context = { threshold: 10 };
    const arr = [5, 10, 15];
    const result = arr.customFilter(function (x) {
      return x > this.threshold;
    }, context);
    expect(result).toEqual([15]);
  });

  test("handles sparse arrays", () => {
    const arr = [1, , 3, undefined];
    const result = arr.customFilter((x) => x !== undefined);
    expect(result).toEqual([1, 3]);
    expect(result.length).toBe(2);
  });

  test("works with array-like objects", () => {
    const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
    const result = Array.prototype.customFilter.call(
      arrayLike,
      (x) => x !== "b"
    );
    expect(result).toEqual(["a", "c"]);
  });

  test("returns empty array for empty input", () => {
    expect([].customFilter((x) => true)).toEqual([]);
  });

  test("filters out falsy values", () => {
    const arr = [0, 1, false, 2, "", 3];
    const result = arr.customFilter(Boolean);
    expect(result).toEqual([1, 2, 3]);
  });

  test("callback can return false", () => {
    const arr = [1, 2, 3];
    const result = arr.customFilter(() => false);
    expect(result).toEqual([]);
  });

  test("does not mutate original array", () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    arr.customFilter((x) => x > 1);
    expect(arr).toEqual(copy);
  });

  test("throws TypeError if callback is not a function", () => {
    expect(() => [1, 2, 3].customFilter(null)).toThrow(TypeError);
    expect(() => [1, 2, 3].customFilter(undefined)).toThrow(TypeError);
    expect(() => [1, 2, 3].customFilter(123)).toThrow(TypeError);
  });

  test("throws TypeError if this is null or undefined", () => {
    expect(() => Array.prototype.customFilter.call(null, (x) => x)).toThrow(
      TypeError
    );
    expect(() =>
      Array.prototype.customFilter.call(undefined, (x) => x)
    ).toThrow(TypeError);
  });
});
