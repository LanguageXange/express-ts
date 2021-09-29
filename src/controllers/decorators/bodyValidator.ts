import { MetadataKeys } from "./MetadataKeys";

import "reflect-metadata";
// this is a decorator @bodyValidator(...)
export function bodyValidator(...somekeys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, somekeys, target, key);
  };
}

// --> bodyValidator(email,password,...blahblah)
