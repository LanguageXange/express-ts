"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
// remember this is a factory decorator function
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
var Methods_1 = require("./Methods");
// after refactoring
function routeBinder(method) {
    return function (path) {
        return function (target, key, dec) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
// get, post , put , delete, patch
// refactor this with Enums
exports.get = routeBinder(Methods_1.Methods.get);
exports.put = routeBinder(Methods_1.Methods.put);
exports.post = routeBinder(Methods_1.Methods.post);
exports.del = routeBinder(Methods_1.Methods.del);
exports.patch = routeBinder(Methods_1.Methods.patch);
