"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
function controller(prefixRoute) {
    // Function here refers to constructor function - this decorator is applying to the class
    return function (target) {
        for (var key in target.prototype) {
            var router = AppRouter_1.AppRouter.getInstance();
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata("path", target.prototype, key);
            if (path) {
                router.get(prefixRoute + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
