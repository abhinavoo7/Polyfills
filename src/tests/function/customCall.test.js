import "../../polyfills/function/call.js";

describe("Function.prototype.customCall", () => {
  test("calls function with specified thisArg and arguments", () => {
    function greet(greeting, punctuation) {
      return `${greeting}, ${this.name}${punctuation}`;
    }
    const person = { name: "Alice" };
    const result = greet.customCall(person, "Hello", "!");
    expect(result).toBe("Hello, Alice!");
  });

  test("uses globalThis when thisArg is null", () => {
    globalThis.name = "Global";
    function sayHi() {
      return this.name;
    }
    expect(sayHi.customCall(null)).toBe("Global");
  });

  test("uses globalThis when thisArg is undefined", () => {
    globalThis.name = "Global";
    function sayHi() {
      return this.name;
    }
    expect(sayHi.customCall(undefined)).toBe("Global");
  });

  test("boxes primitive thisArg (string)", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.customCall("hello")).toBe("object");
  });

  test("boxes primitive thisArg (number)", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.customCall(42)).toBe("object");
  });

  test("boxes primitive thisArg (boolean)", () => {
    function getType() {
      return typeof this;
    }
    expect(getType.customCall(true)).toBe("object");
  });

  test("throws TypeError when called on non-function", () => {
    const notAFunction = {};
    expect(() => Function.prototype.customCall.call(notAFunction)).toThrow(
      TypeError
    );
  });

  test("works with symbol keys on thisArg", () => {
    const sym = Symbol("key");
    const obj = { [sym]: "value" };
    function getSym() {
      return this[sym];
    }
    expect(getSym.customCall(obj)).toBe("value");
  });

  test("works with array as thisArg", () => {
    function firstElement() {
      return this[0];
    }
    expect(firstElement.customCall([10, 20, 30])).toBe(10);
  });

  test("works with function as thisArg", () => {
    function whoAmI() {
      return this.name;
    }
    const context = { name: "FunctionContext" };
    expect(whoAmI.customCall(context)).toBe("FunctionContext");
  });

  test("does not leak temp property on thisArg", () => {
    const obj = { name: "Clean" };
    function getName() {
      return this.name;
    }
    getName.customCall(obj);
    const keys = Object.getOwnPropertySymbols(obj);
    expect(keys.length).toBe(0);
  });

  test("works with no arguments", () => {
    function identity() {
      return this;
    }
    const obj = { id: 123 };
    expect(identity.customCall(obj)).toBe(obj);
  });

  test("works with multiple arguments", () => {
    function sum(a, b, c) {
      return a + b + c;
    }
    expect(sum.customCall(null, 1, 2, 3)).toBe(6);
  });

  test("works with arrow function (ignores thisArg)", () => {
    const arrow = () => this;
    const obj = { name: "Ignored" };
    expect(arrow.customCall(obj)).not.toBe(obj);
  });
});
