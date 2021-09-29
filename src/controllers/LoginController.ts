import { NextFunction, Request, Response } from "express";
import { get, controller, use } from "./decorators"; // remember that we have a index.ts file inside decorator folder

// create a testing middleware to see if everything is working
function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Request was made - middleware is working!");
  next();
}

@controller("/auth")
class LoginController {
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
}
