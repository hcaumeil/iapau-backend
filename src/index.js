import App from "./app.js";
import TeamController from "./team.js";
import DataChallengeController from "./data_challenge.js";
import UsersController from "./users.js";
import DataProjectController from "./data_project.js";
import LoginController from "./login.js";
import SubjectController from "./subject.js"

const controllers = [
  new UsersController(),
  new TeamController(),
  new DataChallengeController(),
  new DataProjectController(),
  new LoginController(),
  new SubjectController()
];

const app = new App(
  controllers,
  8080,
);

app.listen();
