/**
 * @description mimics the behavior of Promise.all by resolving when all input values resolve,
 * or rejecting immediately if any input rejects.
 * @param {Array<Promise>} promises
 * @return {Promise<Array>} promise that resolves to an array of resolved values.
 * @throws {TypeError} if promises is not an array
 */
export default function promiseAll(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Argument must be an array"));
  }

  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const result = Array(promises.length);
    let resolvedPromises = 0;

    promises?.forEach((promise, index) =>
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          resolvedPromises++;
          if (resolvedPromises === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        })
    );
  });
}
