import Controller from "./controller.js";
import { Request, Response, Router } from "express";
import pg_client from "./pg"

class TeamController implements Controller {
  static path = "/team";
  router: Router;

  constructor() {
    this.router = new Router();
    this.router.get(TeamController.path, this.get);
    this.router.post(TeamController.path,this.post);
  }

  async get(req: Request, res: Response) {
    try {
        const result = await pg_client.query("SELECT * FROM team");
        const teamJson = JSON.stringify(result.rows);
        res.status(200).send(teamJson);      
    } catch (error) {
        console.error("Error fetching team table:", error);
        res.status(500).send();
    }
  }

  async post(request: Request, res: Response) {
    try {
        const { name } = await request.body;
        if(!name){
            res.status(401).send("Informations not valid")
        }else{
            const result = await pg_client.query("INSERT INTO team (name, archived) VALUES ($1, $2)", [name, false]);
            if(result.rowCount>0){
                res.status(200).send("Team created")
            }else{
                res.status(401).send("Informations not valid")
            }
        }
    } catch (error) {
        res.status(500).send("Informations not valid")
    }
  }
}

export default TeamController;