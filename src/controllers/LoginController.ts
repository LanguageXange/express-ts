import { Router, Request, Response, NextFunction } from "express";
import { get } from "./decorators/routes";
import { controller } from "./decorators/controller";

@controller("/auth")
class LoginController {
  @get("/login")
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
}
