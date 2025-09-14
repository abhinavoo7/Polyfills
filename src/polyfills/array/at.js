/**
 * @function customAt
 * @description polyfill for Array.prototype.at. Returns the element at the given index, supporting negative indexing.
 * @param {number} index index to access. Negative values count from the end.
 * @returns {unknown | undefined} element at the specified index, or undefined if out of bounds.
 * @throws {TypeError} if called on null/undefined or if index is not a number.
 */
Array.prototype.customAt = function (index = 0) {
  if (this == null) {
    throw new TypeError("Array.prototype.customAt called on null or undefined");
  }
  if (typeof index !== "number") {
    throw new TypeError("index must be number");
  }
  index = Math.trunc(index);
  if (index < 0) {
    index += this.length;
  }
  if (index < 0 || index >= this.length) {
    return undefined;
  }
  return this[index];
};
