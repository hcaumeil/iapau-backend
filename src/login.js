import { Router } from "express";
import pg_client from "./pg.js"
import { sha256 } from "js-sha256";

class LoginController {
  static path = "/login";
  router;

  constructor() {
    this.router = new Router();
    this.router.post(LoginController.path,this.post);
  }

  async post(request, res) {
    try {
        const { password, login } = await request.body;
    
        const result = await pg_client.query(
          "SELECT password,salt,email FROM users WHERE email = '" + login + "';",
        );
    
        if (
          result.rowCount > 0 &&
          sha256(password + result.rows[0].salt) == result.rows[0].password
        ) {
            res.status(200).send(JSON.stringify({valid: "True"}));
        } else {
            res.status(401).send(JSON.stringify({ error: "Wrong Login or password" }));
        }
      } catch (error) {
        res.status(500).send("Informations not valid")
      }
  }
}

export default LoginController;