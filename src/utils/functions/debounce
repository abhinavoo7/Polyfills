/**
 * @description Creates a debounced version of a function that delays its execution
 * until after a specified wait time has elapsed since the last invocation.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} A debounced version of the input function.
 * @throws {TypeError} if arguments are of incorrect types.
 */
export default function debounce(func, delay) {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function as the first argument!");
  }

  if (typeof delay !== "number") {
    throw new TypeError("Expected a number as the second argument!");
  }

  let timeoutId;
  return function debounced(...args) {
    const preservedContext = this;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(preservedContext, args);
    }, delay);
  };
}
