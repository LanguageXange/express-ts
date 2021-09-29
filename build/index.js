"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import { router } from "./routes/loginRoutes"; -- we are using LoginController or RootController
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controllers/LoginController");
var AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
require("./controllers/RootController");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use((0, cookie_session_1.default)({ keys: ["abcdedf"] }));
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(3000, function () {
    console.log("server is running on port 3000");
});
