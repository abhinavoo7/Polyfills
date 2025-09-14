/**
 * @function customApply
 * @description Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function
 * @param {unknown} [thisArg] object to be used as the this object.
 * @param {Array<unknown>} argArray set of arguments to be passed to the function.
 * @returns {unknown} result of invoking the function with the specified context and arguments.
 * @throws {TypeError} if customApply is invoked on a non-function
 */
Function.prototype.customApply = function (thisArg, argArray) {
  if (typeof this !== "function") {
    throw new TypeError(this + " customApply must be called on a function");
  }
  if (argArray && !Array.isArray(argArray)) {
    throw new TypeError(argArray + "argArray must be an array");
  }
  thisArg = Object(thisArg ?? globalThis);
  const tempAttr = Symbol();
  thisArg[tempAttr] = this;
  const result = thisArg[tempAttr](...(argArray ?? []));
  delete thisArg[tempAttr];
  return result;
};
