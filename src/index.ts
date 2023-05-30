import App from "./app.ts";
import TeamController from "./team.js";
import DataChallengeController from "./data_challenge.js";
import UsersController from "./users.js";
import DataProjectController from "./data_project.js";

const controllers = [
  new UsersController(),
  new TeamController(),
  new DataChallengeController(),
  new DataProjectController()
];

const app = new App(
  controllers,
  8080,
);

app.listen();
