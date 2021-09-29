import express from "express";

// singleton
// staic means that we can access the methods without creating an instance
// we only want to have one single router inside our application
export class AppRouter {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}
