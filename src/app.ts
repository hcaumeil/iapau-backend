import cors from "cors";
import express from "express";
import path from "path";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";

import Controller from "./controller.ts";

class App {
  app = express();
  public port: number;
  private controllers: Controller[];

  constructor(controllers: Controller[], port: number) {
    this.port = port;
    this.controllers = controllers;

    this.app.get("/ping", (_req: Request, res: Response) => res.send("PONG !"));
    this.initializeMiddlewares();
    this.initializeControllers(this.controllers);
  }

  private initializeMiddlewares() {
    // Authorizing request from everywhere
    this.app.use(cors());

    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use("/files", express.static("files"));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use("/api", controller.router);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`[INFO] Asimov Api started on port ${this.port}`);
      const option = {
        index: ["index.html"],
      };

      this.app.use("/", express.static("public/", option));
    });
  }
}

export default App;
