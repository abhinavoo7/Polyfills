import "../polyfills/array/map.js";

describe("Array.prototype.customMap", () => {
  test("maps numbers correctly", () => {
    const arr = [1, 2, 3];
    const result = arr.customMap((x) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  test("callback receives value, index, and array", () => {
    const arr = [10, 20, 30];
    const result = arr.customMap((value, index, array) => value + index);
    expect(result).toEqual([10, 21, 32]);
  });

  test("uses thisArg correctly", () => {
    const obj = { factor: 3 };
    const arr = [1, 2, 3];
    const result = arr.customMap(function (x) {
      return x * this.factor;
    }, obj);
    expect(result).toEqual([3, 6, 9]);
  });

  test("handles sparse arrays", () => {
    const sparseArr = [1, , 3];
    const result = sparseArr.customMap((x) => x * 2);
    expect(result.length).toBe(3);
    expect(result[0]).toBe(2);
    expect(1 in result).toBe(false); // hole remains
    expect(result[2]).toBe(6);
  });

  test("works with array-like objects", () => {
    const arrayLike = { 0: "a", 1: "b", length: 2 };
    const result = Array.prototype.customMap.call(arrayLike, (x) => x + "!");
    expect(result).toEqual(["a!", "b!"]);
  });

  test("returns empty array for empty input", () => {
    expect([].customMap((x) => x * 2)).toEqual([]);
  });

  test("callback can return undefined", () => {
    const arr = [1, 2, 3];
    const result = arr.customMap(() => undefined);
    expect(result).toEqual([undefined, undefined, undefined]);
  });

  test("callback can modify the original array", () => {
    const arr = [1, 2, 3];
    const result = arr.customMap((x, i, array) => {
      array[i] = x * 10;
      return x;
    });
    expect(result).toEqual([1, 2, 3]);
    expect(arr).toEqual([10, 20, 30]);
  });

  test("throws TypeError if callback is not a function", () => {
    expect(() => [1, 2, 3].customMap(null)).toThrow(TypeError);
    expect(() => [1, 2, 3].customMap(123)).toThrow(TypeError);
    expect(() => [1, 2, 3].customMap(undefined)).toThrow(TypeError);
  });

  test("throws TypeError if this is null or undefined", () => {
    expect(() => Array.prototype.customMap.call(null, (x) => x)).toThrow(
      TypeError
    );
    expect(() => Array.prototype.customMap.call(undefined, (x) => x)).toThrow(
      TypeError
    );
  });
});
