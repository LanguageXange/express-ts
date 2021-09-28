"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requirerAuth(req, res, next) {
    // set up type guard
    if (req.session && req.session.isLoggedIn) {
        next();
        return;
    }
    // forbidden
    res.status(403);
    res.send("not allow to visit this page");
}
var router = (0, express_1.Router)();
exports.router = router;
router.get("/", function (req, res) {
    /// we looko at req.session
    if (req.session && req.session.isLoggedIn) {
        res.send("<h1>user dashboard page</h1>\n        <div>you are logged in</div>\n        <a href=\"/logout\"> logout</a>\n        ");
    }
    else {
        res.send("<h1>home page: please log in first</h1>\n        <a href=\"/login\"> login</a>\n        ");
    }
});
router.post("/login", function (req, res) {
    // console.log(req);
    var _a = req.body, myemail = _a.myemail, mypassword = _a.mypassword; // body - type is any in type definition file
    //   if (myemail) {
    //     res.send(myemail.toUpperCase());
    //   } else {
    //     res.send("something is wrong!");
    //   }
    if (myemail &&
        mypassword &&
        myemail == "valid@gmail.com" &&
        mypassword === "password") {
        // mark this person as logged in using cookie-session middleware
        // object property can be anything!!
        req.session = { isLoggedIn: true };
        res.redirect("/");
        // redirect them to the root route
    }
    else {
        res.send("invalid password or email");
    }
});
router.get("/logout", function (req, res) {
    req.session = undefined; // to reset req.session
    res.redirect("/");
});
// logic: you can only see this page if you are logged in
// we check auth by passing in a middleware
router.get("/protect", requirerAuth, function (req, res) {
    res.send("exlusive page for logged in users");
});
