import "../../polyfills/array/at.js";

describe("Array.prototype.customAt", () => {
  test("returns element at positive index", () => {
    const arr = [10, 20, 30];
    expect(arr.customAt(1)).toBe(20);
  });

  test("returns element at index 0", () => {
    const arr = ["a", "b", "c"];
    expect(arr.customAt(0)).toBe("a");
  });

  test("returns element at negative index", () => {
    const arr = [1, 2, 3, 4];
    expect(arr.customAt(-1)).toBe(4);
    expect(arr.customAt(-2)).toBe(3);
  });

  test("returns undefined for out-of-bounds positive index", () => {
    const arr = [1, 2];
    expect(arr.customAt(5)).toBeUndefined();
  });

  test("returns undefined for out-of-bounds negative index", () => {
    const arr = [1, 2];
    expect(arr.customAt(-5)).toBeUndefined();
  });

  test("truncates fractional index", () => {
    const arr = ["x", "y", "z"];
    expect(arr.customAt(1.9)).toBe("y");
    expect(arr.customAt(-1.9)).toBe("z");
  });

  test("throws TypeError if called on null", () => {
    expect(() => Array.prototype.customAt.call(null, 0)).toThrow(TypeError);
  });

  test("throws TypeError if called on undefined", () => {
    expect(() => Array.prototype.customAt.call(undefined, 0)).toThrow(
      TypeError
    );
  });

  test("throws TypeError if index is not a number", () => {
    const arr = [1, 2, 3];
    expect(() => arr.customAt("1")).toThrow(TypeError);
    expect(() => arr.customAt({})).toThrow(TypeError);
    expect(() => arr.customAt(NaN)).not.toThrow();
  });

  test("works with sparse arrays", () => {
    const arr = [1, , 3];
    expect(arr.customAt(1)).toBeUndefined();
    expect(arr.customAt(-1)).toBe(3);
  });

  test("works with empty array", () => {
    const arr = [];
    expect(arr.customAt(0)).toBeUndefined();
    expect(arr.customAt(-1)).toBeUndefined();
  });

  test("works with array-like object", () => {
    const obj = { 0: "a", 1: "b", length: 2 };
    expect(Array.prototype.customAt.call(obj, 1)).toBe("b");
  });

  test("default index is 0", () => {
    const arr = ["first", "second"];
    expect(arr.customAt()).toBe("first");
  });
});
