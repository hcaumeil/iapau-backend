import App from "./app.ts";
import TeamController from "./team.js";
import UsersController from "./users.js";

const controllers = [
  new UsersController(),
  new TeamController()
];

const app = new App(
  controllers,
  8080,
);

app.listen();
