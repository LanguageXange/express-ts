import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";
import { NextFunction, RequestHandler, Request, Response } from "express";

// create a middleware function
function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("invalid request!");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res
          .status(422)
          .send("invalid!!! missing property myemail or mypassword");
        return;
      }
    }
    next();
  };
}

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

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];
      // console.log(requiredBodyProps, "what r requiredBodyProps"); --> whatever you pass in the decorator inside LoginController.ts file

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          prefixRoute + path,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
