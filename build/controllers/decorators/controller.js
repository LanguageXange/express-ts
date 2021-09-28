"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router(); // import this to index.ts as well!
function controller(prefixRoute) {
    // Function here refers to constructor function - this decorator is applying to the class
    return function (target) {
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata("path", target.prototype, key);
            if (path) {
                exports.router.get(prefixRoute + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
