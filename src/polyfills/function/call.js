/**
 * @function customCall
 * @description polyfill for Function.prototype.call. Invokes the function with a specified this context and arguments.
 * @param {unknown} [thisArg] value to use as this when calling the function.
 * @param  {...unknown} argArray arguments to pass to the function
 * @returns {unknown} result of invoking the function with the specified context and arguments.
 * @throws {TypeError} if customCall is invoked on a non-function
 */
Function.prototype.customCall = function (thisArg, ...argArray) {
  if (typeof this !== "function") {
    throw new TypeError("customCall must be called on a function");
  }
  thisArg = Object(thisArg ?? globalThis);
  const tempAttr = Symbol();
  thisArg[tempAttr] = this;
  const result = thisArg[tempAttr](...argArray);
  delete thisArg[tempAttr];
  return result;
};
