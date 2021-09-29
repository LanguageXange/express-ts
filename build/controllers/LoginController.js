"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators"); // remember that we have a index.ts file inside decorator folder
// create a testing middleware to see if everything is working
function logger(req, res, next) {
    console.log("Request was made - middleware is working!");
    next();
}
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    // @get("/")
    // add(a: number, b: number): number {
    //   return a + b;
    // }
    LoginController.prototype.getLogin = function (req, res) {
        res.send("<h1> Helloooooooooooo</h1>\n        <form method='POST'>\n        <div>\n        <label for=\"email\">Email</label>\n        <input name=\"myemail\" id=\"email\" type=\"email\"/>\n       \n       \n        <label for=\"password\">Password</label>\n        <input name=\"mypassword\" id=\"password\" type=\"password\"/>\n       \n        \n        <button type='submit'>Submit</button>\n        </div>\n        </form>\n        \n        ");
    };
    LoginController.prototype.testing = function () {
        console.log("this function does nothing");
    };
    LoginController.prototype.postLogin = function (req, res) {
        var _a = req.body, myemail = _a.myemail, mypassword = _a.mypassword; // body - type is 'any' in type definition file
        if (myemail == "valid@gmail.com" && mypassword === "password") {
            req.session = { isLoggedIn: true };
            res.redirect("/");
            // redirect them to the root route
        }
        else {
            res.send("invalid password or email");
        }
    };
    LoginController.prototype.getLogout = function (req, res) {
        req.session = undefined; // to reset req.session
        res.redirect("/");
    };
    __decorate([
        (0, decorators_1.get)("/login"),
        (0, decorators_1.use)(logger) // now if we go to "localhost:3000/auth/login" we should see
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogin", null);
    __decorate([
        (0, decorators_1.post)("/login"),
        (0, decorators_1.bodyValidator)("myemail", "mypassword") // <input> name - which will be sent when making post rerquest
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        (0, decorators_1.get)("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogout", null);
    LoginController = __decorate([
        (0, decorators_1.controller)("/auth")
    ], LoginController);
    return LoginController;
}());
/// cut and paste from loginRoutes.ts & refactor
