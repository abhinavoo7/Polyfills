import "../../polyfills/array/reduce.js";

describe("Array.prototype.customReduce", () => {
  test("reduces array of numbers with initial value", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.customReduce((acc, val) => acc + val, 0);
    expect(result).toBe(10);
  });

  test("reduces array of numbers without initial value", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.customReduce((acc, val) => acc + val);
    expect(result).toBe(10);
  });

  test("reduces array of strings", () => {
    const arr = ["a", "b", "c"];
    const result = arr.customReduce((acc, val) => acc + val, "");
    expect(result).toBe("abc");
  });

  test("handles sparse arrays with initial value", () => {
    const arr = [1, , 3];
    const result = arr.customReduce((acc, val) => acc + val, 0);
    expect(result).toBe(4);
  });

  test("handles sparse arrays without initial value", () => {
    const arr = [, , 3];
    const result = arr.customReduce((acc, val) => acc + val);
    expect(result).toBe(3);
  });

  test("works with array-like objects", () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    const result = Array.prototype.customReduce.call(
      arrayLike,
      (acc, val) => acc + val,
      0
    );
    expect(result).toBe(6);
  });

  test("throws TypeError if callback is not a function", () => {
    expect(() => [1, 2, 3].customReduce(null)).toThrow(TypeError);
    expect(() => [1, 2, 3].customReduce(undefined)).toThrow(TypeError);
    expect(() => [1, 2, 3].customReduce(123)).toThrow(TypeError);
  });

  test("throws TypeError if array is empty and no initial value", () => {
    expect(() => [].customReduce((acc, val) => acc + val)).toThrow(TypeError);
    expect(() => [,].customReduce((acc, val) => acc + val)).toThrow(TypeError);
  });

  test("throws TypeError if this is null or undefined", () => {
    expect(() =>
      Array.prototype.customReduce.call(null, (acc, val) => acc + val)
    ).toThrow(TypeError);
    expect(() =>
      Array.prototype.customReduce.call(undefined, (acc, val) => acc + val)
    ).toThrow(TypeError);
  });

  test("does not mutate original array", () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    arr.customReduce((acc, val) => acc + val, 0);
    expect(arr).toEqual(copy);
  });

  test("can reduce to an object", () => {
    const arr = ["a", "b"];
    const result = arr.customReduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, {});
    expect(result).toEqual({ a: true, b: true });
  });
});
