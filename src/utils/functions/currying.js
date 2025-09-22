/**
 * @description function which accepts a function as the only argument and
 * returns a function that accepts single arguments and
 * can be repeatedly called until at least the minimum number of arguments have been provided
 * @param {Function} func
 * @return {Function}
 * @throws {TypeError} if func is not as function
 */
export default function curry(func) {
  if (typeof func !== "function") {
    throw new TypeError("Expected function as an argument");
  }
  function curryFn(...args) {
    const thisContext = this;
    if (args.length >= func.length) {
      return func.apply(thisContext, args);
    }

    return function (...nextArgs) {
      // if no further args provided
      if (nextArgs.length === 0) {
        return curryFn.apply(thisContext, args);
      }
      return curryFn.apply(thisContext, [...args, ...nextArgs]);
    };
  }

  return curryFn;
}
