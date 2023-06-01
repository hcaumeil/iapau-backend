import { Router } from "express";
import pg_client from "./pg.js";

import { authorizer } from "@biscuit-auth/biscuit-wasm";
import biscuit_md from "./auth.js";

class TeamController {
  static path = "/team";
  router;

  constructor() {
    this.router = new Router();
    this.router.get(
      TeamController.path,
      biscuit_md((req) => authorizer`allow if true);`),
      this.get,
    );
    this.router.post(TeamController.path, this.post);
  }

  async get(req, res) {
    try {
      const result = await pg_client.query("SELECT * FROM team");
      const teamJson = JSON.stringify(result.rows);
      res.status(200).send(teamJson);
    } catch (error) {
      console.error("Error fetching team table:", error);
      res.status(500).send();
    }
  }

  async post(request, res) {
    try {
      const { name, id_users, id_subject } = await request.body;
      if (!name || !id_subject || id_users) {
        res.status(401).send("Informations not valid");
      } else {
        const result = await pg_client.query(
          "INSERT INTO team (name, id_users, id_subject) VALUES ($1, $2, $3)",
          [name, id_users.join(";"), id_subject],
        );
        if (result.rowCount > 0) {
          res.status(200).send("Team created");

          console.log(
            "[POST][200] /team data : " + JSON.stringify(await request.body),
          );
        } else {
          console.log(
            "[POST][400] /subject data : " + JSON.stringify(await request.body),
          );
          res.status(400).send("Informations not valid");
        }
      }
    } catch (error) {
      console.log(
        "[POST][500] /subject data : " + JSON.stringify(await request.body) +
          " error : " + JSON.stringify(error),
      );
      res.status(500).send("Informations not valid");
    }
  }
}

export default TeamController;
