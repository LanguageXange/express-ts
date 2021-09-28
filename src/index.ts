import express from "express";
import { router } from "./routes/loginRoutes";
//import bodyParser from "body-parser"; // deprecated
import cookieSession from "cookie-session";

import { router as controllerRouter } from "./controllers/decorators/controller";
import "./controllers/LoginController";
const app = express();

app.use(express.urlencoded());
app.use(cookieSession({ keys: ["abcdedf"] }));
app.use(router); // make sure this middleware is after other middlewares
app.use(controllerRouter);
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
