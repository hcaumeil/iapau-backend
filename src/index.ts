import App from "./app.ts";
import TeamController from "./team.js";
import DataChallengeController from "./data_challenge.js";
import UsersController from "./users.js";

const controllers = [
  new UsersController(),
  new TeamController(),
  new DataChallengeController()
];

const app = new App(
  controllers,
  8080,
);

app.listen();
