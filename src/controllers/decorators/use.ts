import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";
import "reflect-metadata";
// for @use - we will use it for multiple middleware
export function use(middleware: RequestHandler) {
  return function (target: any, key: string, dec: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
    middlewares.push(middleware);

    // define meta data

    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key);
  };
}
