import { NextFunction, Request, Response } from "express";
import { get, controller, use, bodyValidator, post } from "./decorators"; // remember that we have a index.ts file inside decorator folder

// create a testing middleware to see if everything is working
function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Request was made - middleware is working!");
  next();
}

@controller("/auth")
class LoginController {
  // @get("/")
  // add(a: number, b: number): number {
  //   return a + b;
  // }

  @get("/login")
  @use(logger) // now if we go to "localhost:3000/auth/login" we should see
  getLogin(req: Request, res: Response): void {
    res.send(`<h1> Helloooooooooooo</h1>
        <form method='POST'>
        <div>
        <label for="email">Email</label>
        <input name="myemail" id="email" type="email"/>
       
       
        <label for="password">Password</label>
        <input name="mypassword" id="password" type="password"/>
       
        
        <button type='submit'>Submit</button>
        </div>
        </form>
        
        `);
  }

  testing(): void {
    console.log("this function does nothing");
  }

  @post("/login")
  @bodyValidator("myemail", "mypassword") // <input> name - which will be sent when making post rerquest
  postLogin(req: Request, res: Response): void {
    const { myemail, mypassword } = req.body; // body - type is 'any' in type definition file

    if (myemail == "valid@gmail.com" && mypassword === "password") {
      req.session = { isLoggedIn: true };
      res.redirect("/");
      // redirect them to the root route
    } else {
      res.send("invalid password or email");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined; // to reset req.session
    res.redirect("/");
  }
}

/// cut and paste from loginRoutes.ts & refactor
