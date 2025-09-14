import "../../polyfills/function/bind.js";

describe("Function.prototype.customBind", () => {
  test("binds thisArg correctly", () => {
    function whoAmI() {
      return this.name;
    }
    const context = { name: "John" };
    const bound = whoAmI.customBind(context);
    expect(bound()).toBe("John");
  });

  test("binds arguments partially", () => {
    function greet(greeting, name) {
      return `${greeting}, ${name}`;
    }
    const bound = greet.customBind(null, "Hello");
    expect(bound("John")).toBe("Hello, John");
  });

  test("binds both thisArg and arguments", () => {
    function greet(greeting, punctuation) {
      return `${greeting}, ${this.name}${punctuation}`;
    }
    const person = { name: "John" };
    const bound = greet.customBind(person, "Hi");
    expect(bound("!")).toBe("Hi, John!");
  });

  test("works with no arguments", () => {
    function sayHi() {
      return "Hi";
    }
    const bound = sayHi.customBind();
    expect(bound()).toBe("Hi");
  });

  test("uses globalThis when thisArg is null", () => {
    globalThis.name = "Global";
    function whoAmI() {
      return this.name;
    }
    const bound = whoAmI.customBind(null);
    expect(bound()).toBe("Global");
  });

  test("uses globalThis when thisArg is undefined", () => {
    globalThis.name = "Global";
    function whoAmI() {
      return this.name;
    }
    const bound = whoAmI.customBind(undefined);
    expect(bound()).toBe("Global");
  });

  test("boxes primitive thisArg (string)", () => {
    function getType() {
      return typeof this;
    }
    const bound = getType.customBind("hello");
    expect(bound()).toBe("object");
  });

  test("boxes primitive thisArg (number)", () => {
    function getType() {
      return typeof this;
    }
    const bound = getType.customBind(42);
    expect(bound()).toBe("object");
  });

  test("boxes primitive thisArg (boolean)", () => {
    function getType() {
      return typeof this;
    }
    const bound = getType.customBind(true);
    expect(bound()).toBe("object");
  });

  test("throws TypeError when called on non-function", () => {
    const notAFunction = {};
    expect(() => Function.prototype.customBind.call(notAFunction)).toThrow(
      TypeError
    );
  });

  test("works with array as thisArg", () => {
    function getFirst() {
      return this[0];
    }
    const bound = getFirst.customBind([10, 20, 30]);
    expect(bound()).toBe(10);
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
    const bound = whoAmI.customBind(context);
    expect(bound()).toBe("FunctionContext");
  });

  test("works with symbol keys on thisArg", () => {
    const sym = Symbol("key");
    const obj = { [sym]: "value" };
    function getSym() {
      return this[sym];
    }
    const bound = getSym.customBind(obj);
    expect(bound()).toBe("value");
  });

  test("works with arrow function (ignores thisArg)", () => {
    const arrow = () => this;
    const obj = { name: "Ignored" };
    const bound = arrow.customBind(obj);
    expect(bound()).not.toBe(obj);
  });

  test("works with multiple invocations", () => {
    function add(a, b) {
      return a + b;
    }
    const bound = add.customBind(null, 2);
    expect(bound(3)).toBe(5);
    expect(bound(10)).toBe(12);
  });

  test("does not leak temp property on thisArg", () => {
    const obj = { name: "Clean" };
    function getName() {
      return this.name;
    }
    const bound = getName.customBind(obj);
    bound();
    const keys = Object.getOwnPropertySymbols(obj);
    expect(keys.length).toBe(0);
  });

  test("works with deeply nested thisArg", () => {
    const obj = { inner: { name: "John" } };
    function getName() {
      return this.name;
    }
    const bound = getName.customBind(obj.inner);
    expect(bound()).toBe("John");
  });
});
