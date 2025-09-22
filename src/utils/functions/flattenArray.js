/**
 * @description function to flatten an array using recursion
 * @param {Array<*|Array>} arr array to flatten
 * @return {Array} flattened array
 * @throws {TypeError} if the argument is not array
 */
export default function flattenRecursive(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected arr as an argument!");
  }
  const result = [];
  /**
   * @description sub function which flattens array using recursion and closures
   * @param {Array<*|Array>} subArray
   */
  const subFlatten = (subArray) => {
    for (const val of subArray) {
      if (Array.isArray(val)) {
        subFlatten(val);
      } else {
        result.push(val);
      }
    }
  };
  subFlatten(arr);
  return result;
}

/**
 * @description function to flatten an array using iteration
 * @param {Array<*|Array>} arr array to flatten
 * @return {Array} flattened array
 * @throws {TypeError} if the argument is not array
 */
export default function flatten(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected arr as an argument!");
  }
  const result = [];
  const stack = [...arr];
  
  while(stack.length){
    const val = stack.pop();
    if(Array.isArray(val)){
        stack.push(...val);
    } else {
        result.push(val);
    }
  }
  return result.reverse();
}
