"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("./routes/loginRoutes");
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controllers/LoginController");
var AppRouter_1 = require("./AppRouter");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use((0, cookie_session_1.default)({ keys: ["abcdedf"] }));
app.use(loginRoutes_1.router); // make sure this middleware is after other middlewares
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(3000, function () {
    console.log("server is running on port 3000");
});
