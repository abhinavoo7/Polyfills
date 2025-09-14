/**
 * @function customBind
 * @param {unknown} [thisArg] value to use as this when calling the function
 * @param {...unknown} [argArray] arguments to pass to the function
 * @return {Function} function with the specified context and arguments
 * @throws {TypeError} if customBind is invoked on a non-function
 */
Function.prototype.customBind = function (thisArg, ...argArray) {
  if (typeof this !== "function") {
    throw new TypeError("customBind must be called on a function");
  }

  const originalFnContext = this;
  return (...futureArgs) => {
    thisArg = Object(thisArg ?? globalThis);
    const tempAttr = Symbol();
    thisArg[tempAttr] = originalFnContext;
    const result = thisArg[tempAttr](...argArray, ...futureArgs);
    delete thisArg[tempAttr];
    return result;
  };
};
