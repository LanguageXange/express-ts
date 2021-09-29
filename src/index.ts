import express from "express";
//import { router } from "./routes/loginRoutes"; -- we are using LoginController or RootController
import cookieSession from "cookie-session";

import "./controllers/LoginController";
import { AppRouter } from "./AppRouter";
import "./controllers/LoginController";
import "./controllers/RootController";

const app = express();

app.use(express.urlencoded());
app.use(cookieSession({ keys: ["abcdedf"] }));
app.use(AppRouter.getInstance());
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
