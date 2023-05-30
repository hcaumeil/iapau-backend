import App from "./app.ts";
import UsersController from "./users.js";

const controllers = [
  new UsersController()
];

const app = new App(
  controllers,
  8080,
);

app.listen();
