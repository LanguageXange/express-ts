import { NextFunction, Request, Response } from "express";
import { get, controller, use, bodyValidator, post } from "./decorators"; // remember that we have a index.ts file inside decorator folder

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

@controller("")
class RootController {
  @get("/")
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.isLoggedIn) {
      res.send(`<h1>user dashboard page</h1>
              <div>you are logged in</div>
              <a href="/auth/logout"> logout</a>
              <a href="/protect"> exclusive page!</a>
              `);
    } else {
      res.send(`<h1>home page: please log in first</h1>
              <a href="/auth/login"> login</a>
              `);
    }
  }

  @get("/protect")
  @use(requirerAuth)
  getProtected(req: Request, res: Response) {
    res.send("exlusive page for logged in users");
  }
}
