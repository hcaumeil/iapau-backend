import Controller from "./controller.js";
import { Request, Response, Router } from "express";
import pg_client from "./pg.js"

class DataChallengeController implements Controller {
  static path = "/data_challenge";
  router: Router;

  constructor() {
    this.router = new Router();
    this.router.get(DataChallengeController.path, this.get);
    this.router.post(DataChallengeController.path,this.post);
    this.router.get(DataChallengeController.path+"/:id",this.get_data_challenge);
    this.router.delete(DataChallengeController.path+"/:id",this.delete);
    this.router.post(DataChallengeController.path+"/:id",this.modify);
  }

  async get(req: Request, res: Response) {
    try {
        const result = await pg_client.query("SELECT * FROM data_challenge");
        const data_challengeJson = JSON.stringify(result.rows);
        res.status(200).send(data_challengeJson);  
    } catch (error) {
        res.status(500).send();
    }
  }

  async post(request: Request, res: Response) {
    try {
        const { name, begin_date, end_date } = await request.body;
        if (!name || !begin_date || !end_date) {
            res.status(401).send("One or more attribute is undefined")
        }else{
            const result = await pg_client.query(
                "INSERT INTO data_challenge (name,begin_date,end_date) VALUES('" + name +
                "',TO_DATE('" + begin_date + "', 'DD-MM-YYYY'),TO_DATE('" + end_date +
                "', 'DD-MM-YYYY'));",
            );  
            if (result.rowCount > 0) {
                res.status(200).send("Data challenge created")
            }else{
                res.status(401).send("Invalid informations")
            }
        }
    } catch (error) {
        res.status(500).send("Informations not valid")
    }
  }

  async get_data_challenge(req: Request, res: Response) {
    try {  
      const result = await pg_client.query("SELECT * FROM data_challenge where id='"+req.params.id+"';");
      const data_challenge = result.rows;
      res.status(200).send(JSON.stringify(data_challenge));
    } catch (error) {
    res.status(500).send();
    }
  }
  
  async modify(req: Request, res: Response) {
    try {      
        const data = await req.body;
        let query = "UPDATE data_challenge Set ";
        Object.entries(data).forEach(([key, value]) => {
            if(typeof value === 'string' && key.includes("date")){
            query = query.concat(key+"=TO_DATE('"+value+"','DD-MM-YYYY'),");
            }else{
            query = query.concat(key+"='"+value+"',");
            }
        });
        query = query.slice(0, -1);
        query = query.concat("WHERE id = '"+req.params.id+"';" );
        const result = await pg_client.query(query);
  
        if(result.rowCount>0){
            res.status(200).send(JSON.stringify("Data challenge modified"));
        }else{
            res.status(400).send("Informations not valid");
        }
    } catch (error) {
      res.status(500).send();
    }
  }

  async delete(req: Request, res: Response) {
    try {  
      const result = await pg_client.query("DELETE FROM data_challenge where id='"+req.params.id+"';");
      if(result.rowCount>0){
        res.status(200).send(JSON.stringify("Data challenge deleted"));
      }else{
        res.status(400).send("Wrong id");
      }
      } catch (error) {
        res.status(500).send();
      }
  }
}

export default DataChallengeController;