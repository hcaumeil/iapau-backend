import { Router } from "express";
import pg_client from "./pg.js";

class DataProjectController {
  static path = "/data_project";
  router;

  constructor() {
    this.router = new Router();
    this.router.get(DataProjectController.path, this.get);
    this.router.post(DataProjectController.path, this.post);
    this.router.get(DataProjectController.path + "/:id", this.get_data_project);
    this.router.delete(DataProjectController.path + "/:id", this.delete);
    this.router.post(DataProjectController.path + "/:id", this.modify);
  }

  async get(req, res) {
    try {
      const result = await pg_client.query("SELECT * FROM data_project");
      const data_projectJson = JSON.stringify(result.rows);
      res.status(200).send(data_projectJson);
    } catch (error) {
      res.status(500).send();
    }
  }

  async post(request, res) {
    try {
      const { name, description, image, contact, ressources } = await request
        .body;
      if (!name || !description || !image || !contact || !ressources) {
        res.status(401).send("One or more attribute is undefined");
      } else {
        const result = await pg_client.query(
          "INSERT INTO data_project (name, description, image, contact, ressources) VALUES ($1, $2, $3, $4, $5)",
          [name, description, image, contact, ressources],
        );

        if (result.rowCount > 0) {
          res.status(200).send("Data project created");
        } else {
          res.status(401).send("Invalid informations");
        }
      }
    } catch (error) {
      res.status(500).send("Informations not valid");
    }
  }

  async get_data_project(req, res) {
    try {
      const result = await pg_client.query(
        "SELECT * FROM data_project where id='" + req.params.id + "';",
      );
      const data_project = result.rows;
      res.status(200).send(JSON.stringify(data_project));
    } catch (error) {
      res.status(500).send();
    }
  }

  async modify(req, res) {
    try {
      const data = await req.body;
      let query = "UPDATE data_project Set ";
      Object.entries(data).forEach(([key, value]) => {
        query = query.concat(key + "='" + value + "',");
      });
      query = query.slice(0, -1);
      query = query.concat("WHERE id = '" + req.params.id + "';");
      const result = await pg_client.query(query);
      if (result.rowCount > 0) {
        res.status(200).send(JSON.stringify("Data project modified"));
      } else {
        res.status(400).send("Informations not valid");
      }
    } catch (error) {
      res.status(500).send();
    }
  }

  async delete(req, res) {
    try {
      const result = await pg_client.query(
        "DELETE FROM data_project where id='" + req.params.id + "';",
      );
      if (result.rowCount > 0) {
        res.status(200).send(JSON.stringify("Data project deleted"));
      } else {
        res.status(400).send("Wrong id");
      }
    } catch (error) {
      res.status(500).send();
    }
  }
}

export default DataProjectController;
