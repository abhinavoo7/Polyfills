Function.prototype.customCall = function (thisArg, ...argArray) {
  if (typeof this !== "function") {
    throw new TypeError("customCall must be called on a function");
  }
  thisArg = Object(thisArg ?? globalThis);
  const tempAttr = Symbol();
  thisArg[tempAttr] = this;
  const result = thisArg[tempAttr](...argArray);
  delete thisArg[tempAttr];
  return result;
};
