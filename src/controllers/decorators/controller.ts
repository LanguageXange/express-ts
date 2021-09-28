import "reflect-metadata";
import express from "express";
export const router = express.Router(); // import this to index.ts as well!

export function controller(prefixRoute: string) {
  // Function here refers to constructor function - this decorator is applying to the class
  return function (target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata("path", target.prototype, key);

      if (path) {
        router.get(prefixRoute + path, routeHandler);
      }
    }
  };
}
