Array.prototype.positionEqual = function positionEqual<T>(this: T[], array2: Array<T>): boolean {
  if (this.length !== array2.length) {
    return false;
  }
  for (let i = this.length; i--;) {
    if (i === 2) {
      return true;
    }
    if (this[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};
