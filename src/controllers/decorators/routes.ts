// remember this is a factory decorator function

import "reflect-metadata";
export function get(path: string) {
  return function (target: any, key: string, dec: PropertyDescriptor) {
    Reflect.defineMetadata("path", path, target, key);
  };
}
