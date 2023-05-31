import Controller from "./controller.js";
import { Request, Response, Router } from "express";
import pg_client from "./pg"
import { sha256 } from "js-sha256";


class UsersController implements Controller {
  static path = "/user";
  router: Router;

  constructor() {
    this.router = new Router();
    this.router.get(UsersController.path, this.get);
    this.router.post(UsersController.path,this.post);
    this.router.get(UsersController.path+"/:id",this.get_user);
    this.router.delete(UsersController.path+"/:id",this.delete);
    this.router.post(UsersController.path+"/:id",this.modify);
  }

  async get(req: Request, res: Response) {
    try {
      const mail = req.headers["email"];
      if (mail) {
        const checkEmailQuery =
          `SELECT COUNT(*) FROM users WHERE email = '${mail}';`;
        const emailResult = await pg_client.query(checkEmailQuery);
        const emailCount = emailResult.rows[0].count;
        if (emailCount > 0) {
          res.status(404).send("Email already taken");

        } else {
          res.status(200).send("Email can be taken");
        }
      } else {  
        const result = await pg_client.query("SELECT * FROM users");
        const usersJson = JSON.stringify(result.rows);
        res.send(usersJson);
      }
    } catch (error) {
      console.error("Error fetching user table:", error);
      res.status(500).send();
    }
  }

  async post(request: Request, res: Response) {
    try {
      const { email, surname, name, password, study_level, town, school, role } = await request.body;
      if (
        !email || !surname || !name || !password || !study_level || !town || 
        !school || !role
      ) {
        res.status(400).send("One or more attribute is undefined")
      }else{
        const checkEmailQuery =`SELECT COUNT(*) FROM users WHERE email = '${email}';`;
        const emailResult = await pg_client.query(checkEmailQuery);
        const emailCount = emailResult.rows[0].count;
        if (emailCount > 0) {
          res.status(400).send("Email already taken")
        }else{
          const salt = generateRandomString(16);
          const hashed_password = sha256(password + salt);
          const result = await pg_client.query(
            "INSERT INTO users (email,surname,name,password,salt,level,study_level,town,school,role) VALUES('" +
              email + "','" + surname + "','" + name + "','" + hashed_password +
              "','" + salt + "',0,'" + study_level + "','" + town + "','" + school +
              "','" + role + "');",
          );
          if (result.rowCount > 0) {
            res.status(200).send("User created")
          }else{
            res.status(401).send("Informations not valid")
          }
        }
      }
    } catch (error) {
      res.status(500).send("Informations not valid")
    }
  }

  async get_user(req: Request, res: Response) {
    try {  
      const result = await pg_client.query("SELECT * FROM users where id='"+req.params.id+"';");
      const users = result.rows;
      res.status(200).send(JSON.stringify(users));
    } catch (error) {
      res.status(500).send();
    }
  }

  async delete(req: Request, res: Response) {
    try {  
      const result = await pg_client.query("DELETE FROM users where id='"+req.params.id+"';");
      if(result.rowCount>0){
        res.status(200).send(JSON.stringify("User deleted"));
      }else{
        res.status(400).send("Wrong id");
      }
      } catch (error) {
        res.status(500).send();
      }
  }

  async modify(req: Request, res: Response) {
    try {      
      const data = await req.body;
      let query = "UPDATE users Set ";
      if(!data){
        res.status(400).send("No attributes to modify");
      }else{
        Object.entries(data).forEach(([key, value]) => {
          query = query.concat(key+"='"+value+"',");
          console.log(key + " , value : "+value);
        });
        query = query.slice(0, -1);
        query = query.concat("WHERE id = '"+req.params.id+"';" );
        console.log(query)
        const result = await pg_client.query(query);
        if(result.rowCount>0){
          res.status(200).send(JSON.stringify("User modified"));
        }else{
          res.status(400).send("Informations not valid");
        }
      }
    } catch (error) {
      res.status(500).send();
    }
  }
}

function generateRandomString(length: number) {
  let result = "";
  const characters =
    "*$&é(-è_çà)ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export default UsersController;