"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function controller(prefixRoute) {
    // Function here refers to constructor function - this decorator is applying to the class
    return function (target) {
        for (var key in target.prototype) {
            var router = AppRouter_1.AppRouter.getInstance();
            var routeHandler = target.prototype[key];
            // console.log(target, "what is target"); // LoginController constructor function
            // console.log(key, "what is key"); // getLogin and testing
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key); // remember we defineMetadata inside routes.ts
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            if (path) {
                router[method](prefixRoute + path, __spreadArray([], middlewares, true), routeHandler);
            }
        }
    };
}
exports.controller = controller;
