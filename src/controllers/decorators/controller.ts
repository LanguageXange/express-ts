import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

export function controller(prefixRoute: string) {
  // Function here refers to constructor function - this decorator is applying to the class
  return function (target: Function) {
    for (let key in target.prototype) {
      const router = AppRouter.getInstance();
      const routeHandler = target.prototype[key];
      // console.log(target, "what is target"); // LoginController constructor function
      // console.log(key, "what is key"); // getLogin and testing
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      ); // remember we defineMetadata inside routes.ts
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      if (path) {
        router[method](prefixRoute + path, [...middlewares], routeHandler);
      }
    }
  };
}
