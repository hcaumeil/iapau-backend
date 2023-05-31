import cors from "cors";
import path from "path";
import express from "express";
import bodyParser from "body-parser";

class App {
  app = express();
  port;
  controllers;

  constructor(controllers, port) {
    this.port = port;
    this.controllers = controllers;

    this.app.get("/ping", (_req, res) => res.send("PONG !"));
    this.initializeMiddlewares();
    this.initializeControllers(this.controllers);
  }

  initializeMiddlewares() {
    // Authorizing request from everywhere
    this.app.use(cors());

    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
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
