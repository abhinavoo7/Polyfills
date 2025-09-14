/**
 * @description custom filter polyfill
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {unknown} [thisArg]
 * @return {Array<T>}
 * @throws {TypeError} if called on null or undefined, or if callbackFn is not a function
 */
Array.prototype.customFilter = function (callbackFn, thisArg) {
  // Check if the array is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.filter called on null or undefined");
  }

  // Check if callbackFn is a function
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  const result = [];
  // Convert this to an Object to handle array-like objects
  const inputArr = Object(this);

  for (let i = 0; i < inputArr.length; i++) {
    if (i in inputArr && callbackFn.call(thisArg, inputArr[i], i, inputArr)) {
      result.push(inputArr[i]);
    }
  }
  return result;
};
