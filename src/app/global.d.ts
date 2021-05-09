export { };
declare global {
  interface Array<T> {
    positionEqual(this: T[], array2: Array<T>): boolean;
  }
}
