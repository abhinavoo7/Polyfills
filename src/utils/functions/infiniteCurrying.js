/**
 * @description function which accepts a function as the only argument and supports infinite currying
 * @param {Function} func
 * @return {Function}
 * @throws {TypeError} if func is not as function
 */
export default function infiniteCurry(func) {
  if (typeof func !== "function") {
    throw new TypeError("Expected function as an argument");
  }
  function curryFn(...args) {
    return function (...nextArgs) {
      // if no further args provided
      if (nextArgs.length === 0) {
        return func.apply(this, args);
      }
      return curryFn.apply(this, [...args, ...nextArgs]);
    };
  }

  return curryFn;
}
