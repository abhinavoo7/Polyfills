/**
 * @description custom map function
 * @template T, U
 * @param {(value: T, index: number, array: Array<T>) => U} callbackFn
 * @param {unknown} thisArg
 * @returns {Array<U>}
 * @throws {TypeError} If called on null or undefined, or if callbackFn is not a function
 */
Array.prototype.customMap = function (callbackFn, thisArg) {
  // Check if the array is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  // Check if callbackFn is a function
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  // Convert this to an Object to handle array-like objects
  const inputArr = Object(this);
  const result = new Array(inputArr.length);

  for (let i = 0; i < inputArr.length; i++) {
    // Only call callbackFn on elements that exist (skip holes)
    if (i in inputArr) {
      result[i] = callbackFn.call(thisArg, inputArr[i], i, inputArr);
    }
  }
  return result;
};
