import "../../polyfills/function/apply.js";

describe("Function.prototype.customApply", () => {
  test("calls function with specified thisArg and arguments", () => {
    function greet(greeting, punctuation) {
      return `${greeting}, ${this.name}${punctuation}`;
    }
    const person = { name: "John" };
    const result = greet.customApply(person, ["Hello", "!"]);
    expect(result).toBe("Hello, John!");
  });

  test("uses globalThis when thisArg is null", () => {
    globalThis.name = "Global";
    function sayHi() {
      return this.name;
    }
    expect(sayHi.customApply(null)).toBe("Global");
  });

  test("uses globalThis when thisArg is undefined", () => {
    globalThis.name = "Global";
    function sayHi() {
      return this.name;
    }
    expect(sayHi.customApply(undefined)).toBe("Global");
  });

  test("boxes primitive thisArg (string)", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.customApply("hello")).toBe("object");
  });

  test("boxes primitive thisArg (number)", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.customApply(42)).toBe("object");
  });

  test("boxes primitive thisArg (boolean)", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.customApply(true)).toBe("object");
  });

  test("throws TypeError when called on non-function", () => {
    const notAFunction = {};
    expect(() => Function.prototype.customApply.call(notAFunction)).toThrow(
      TypeError
    );
  });

  test("throws TypeError when argArray is not an array", () => {
    function testFn() {}
    expect(() => testFn.customApply(null, "not-an-array")).toThrow(TypeError);
    expect(() => testFn.customApply(null, { length: 2 })).toThrow(TypeError);
  });

  test("works with no arguments", () => {
    function identity() {
      return this;
    }
    const obj = { id: 123 };
    expect(identity.customApply(obj)).toBe(obj);
  });

  test("works with empty array as argArray", () => {
    function noArgs() {
      return "ok";
    }
    expect(noArgs.customApply(null, [])).toBe("ok");
  });

  test("works with multiple arguments", () => {
    function sum(a, b, c) {
      return a + b + c;
    }
    expect(sum.customApply(null, [1, 2, 3])).toBe(6);
  });

  test("does not leak temp property on thisArg", () => {
    const obj = { name: "Clean" };
    function getName() {
      return this.name;
    }
    getName.customApply(obj);
    const keys = Object.getOwnPropertySymbols(obj);
    expect(keys.length).toBe(0);
  });

  test("works with array as thisArg", () => {
    function firstElement() {
      return this[0];
    }
    expect(firstElement.customApply([10, 20, 30])).toBe(10);
  });

  test("works with function as thisArg", () => {
    function whoAmI() {
      return this.name;
    }
    const context = function () {};
    Object.defineProperty(context, "name", {
      value: "FunctionContext",
      writable: true,
      configurable: true,
    });
    expect(whoAmI.customApply(context)).toBe("FunctionContext");
  });

  test("works with symbol keys on thisArg", () => {
    const sym = Symbol("key");
    const obj = { [sym]: "value" };
    function getSym() {
      return this[sym];
    }
    expect(getSym.customApply(obj)).toBe("value");
  });

  test("works with arrow function (ignores thisArg)", () => {
    const arrow = () => this;
    const obj = { name: "Ignored" };
    expect(arrow.customApply(obj)).not.toBe(obj);
  });

  test("works with undefined argArray", () => {
    function sayHello() {
      return "Hello";
    }
    expect(sayHello.customApply(null)).toBe("Hello");
  });
});
