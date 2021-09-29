// remember this is a factory decorator function
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

// after refactoring
function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, dec: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

// get, post , put , delete, patch
// refactor this with Enums
export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
