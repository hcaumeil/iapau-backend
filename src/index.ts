import App from "./app.ts";

const controllers = [
];

const app = new App(
  controllers,
  8080,
);

app.listen();
