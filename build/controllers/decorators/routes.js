"use strict";
// remember this is a factory decorator function
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
require("reflect-metadata");
function get(path) {
    return function (target, key, dec) {
        Reflect.defineMetadata("path", path, target, key);
    };
}
exports.get = get;
