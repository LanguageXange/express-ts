import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requirerAuth(req: Request, res: Response, next: NextFunction) {
  // set up type guard
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  }
  // forbidden
  res.status(403);
  res.send("not allow to visit this page");
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  /// we looko at req.session

  if (req.session && req.session.isLoggedIn) {
    res.send(`<h1>user dashboard page</h1>
        <div>you are logged in</div>
        <a href="/logout"> logout</a>
        `);
  } else {
    res.send(`<h1>home page: please log in first</h1>
        <a href="/login"> login</a>
        `);
  }
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  // console.log(req);
  const { myemail, mypassword } = req.body; // body - type is any in type definition file
  //   if (myemail) {
  //     res.send(myemail.toUpperCase());
  //   } else {
  //     res.send("something is wrong!");
  //   }

  if (
    myemail &&
    mypassword &&
    myemail == "valid@gmail.com" &&
    mypassword === "password"
  ) {
    // mark this person as logged in using cookie-session middleware
    // object property can be anything!!
    req.session = { isLoggedIn: true };
    res.redirect("/");

    // redirect them to the root route
  } else {
    res.send("invalid password or email");
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined; // to reset req.session
  res.redirect("/");
});

// logic: you can only see this page if you are logged in
// we check auth by passing in a middleware
router.get("/protect", requirerAuth, (req: Request, res: Response) => {
  res.send("exlusive page for logged in users");
});
export { router };
