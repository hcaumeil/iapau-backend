import { Router } from "express";
import pg_client from "./pg.js";

import { authorizer } from "@biscuit-auth/biscuit-wasm";
import biscuit_md from "./auth.js";

class SubjectController {
  static path = "/subject";
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
      const result = await pg_client.query("SELECT * FROM subject");
      const teamJson = JSON.stringify(result.rows);
      res.status(200).send(teamJson);
    } catch (error) {
      console.error("Error fetching team table:", error);
      res.status(500).send();
    }
  }

  async post(request, res) {
    try {
      const { name, id_data_challenge } = await request.body;
      if (!name) {
        res.status(400).send("Informations not valid");
      } else {
        const result = await pg_client.query(
          "INSERT INTO subject (name, id_data_challenge) VALUES ($1, $2)",
          [name, id_data_challenge],
        );
        if (result.rowCount > 0) {
          res.status(200).send("Subject created");
          console.log(
            "[POST][200] /subject data : " + JSON.stringify(await request.body),
          );
        } else {
          res.status(400).send("Informations not valid");

          console.log(
            "[POST][400] /subject data : " + JSON.stringify(await request.body),
          );
        }
      }
    } catch (error) {
      res.status(500).send("Informations not valid");

      console.log(
        "[POST][500] /subject data : " + JSON.stringify(await request.body) +
          " error : " + JSON.stringify(error),
      );
    }
  }
}

export default SubjectController;
