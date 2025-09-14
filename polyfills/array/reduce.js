/**
 * @description Custom reduce polyfill
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 * @throws {TypeError} if called on null/undefined or if callbackFn is not a function
 */

Array.prototype.customReduce = function (callbackFn, initialValue) {
  // Check if the array is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.filter called on null or undefined");
  }

  // Check if callbackFn is a function
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  // Convert this to an object to handle array-like objects
  const inputArr = Object(this);

  let result = initialValue;
  let startIndex = 0;

  // Handle case where no initialValue is provided
  if (initialValue === undefined) {
    // If array is empty and no initialValue, throw error
    if (inputArr.length == 0) {
      throw new TypeError("both initial value and array cannot be empty");
    }

    // Use first defined element as initial accumulator
    while (startIndex < inputArr.length && !(startIndex in inputArr)) {
      startIndex++;
    }

    if (startIndex >= inputArr.length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    result = inputArr[startIndex];
    startIndex++;
  }

  for (let i = startIndex; i < inputArr.length; i++) {
    if (i in inputArr) {
      result = callbackFn(result, inputArr[i], i, inputArr);
    }
  }
  return result;
};
