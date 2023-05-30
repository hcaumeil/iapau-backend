import Controller from "./controller.js";
import { Request, Response, Router } from "express";
import pg_client from "./pg"
//import { sha256 } from "js-sha256";


class UsersController implements Controller {
  static path = "/user";
  router: Router;

  constructor() {
    this.router = new Router();
    this.router.get(UsersController.path, this.get);
  }

  async get(req: Request, res: Response) {
    try {
      const mail = req.headers["email"];
      if (mail) {
        const checkEmailQuery =
          `SELECT COUNT(*) FROM users WHERE email = '${mail}';`;
        const emailResult = await pg_client.query(checkEmailQuery);
        const emailCount = emailResult.rows[0].count;
        const role = "user";
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
  // static async post_new(request: Request, res: Response, id?: number) {
  //   try {
  //     const { email, surname, name, password, study_level, town, school } =
  //       await request.body.json();
  //     if (
  //       !email || !surname || !name || !password || !study_level || !town ||
  //       !school
  //     ) {
  //       res.status(400).send("One or more attribute is undefined")
  //     }
  //     const checkEmailQuery =
  //       `SELECT COUNT(*) FROM users WHERE email = '${email}';`;
  //     const emailResult = await pg_client.query(checkEmailQuery);
  //     const emailCount = emailResult.rows[0].count;
  
  //     if (emailCount > 0) {
  //       res.status(400).send("Email already taken")
  //     }
  //     const salt = generateRandomString(16);
  //     const hashed_password = sha256(password + salt);
  //     const role = "user";
  //     const result = await pg_client.query(
  //       "INSERT INTO users (email,surname,name,password,salt,level,study_level,town,school,role) VALUES('" +
  //         email + "','" + surname + "','" + name + "','" + hashed_password +
  //         "','" + salt + "',0,'" + study_level + "','" + town + "','" + school +
  //         "','" + role + "');",
  //     );
  //     if (result.rowCount > 0) {
  //       res.status(200).send("User created")
  //     }
  //     throw error(401, {
  //       message: "Informations not valid",
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user table:", error);
  //     return new Response(JSON.stringify({
  //       error: "Internal Server Error",
  //     }));
  //   }
  //   let sql;
  //   let data;
  //   const db = new Database("asimov.db");
  //   const exist = await this.exist_email(p.email);
  //   if (exist) {
  //     res.status(400).send();
  //     return;
  //   }

  //   if (typeof id !== "undefined") {
  //     res.status(400).send();
  //     return;
  //   } else {
  //     sql = "INSERT INTO user VALUES(?,?,?,?,?)";
  //     data = [
  //       p.name,
  //       p.family_name,
  //       p.email,
  //       p.password,
  //       p.basket,
  //     ];
  //   }

  //   let e;
  //   db.run(sql, data, (err) => e = err);
  //   if (e) {
  //     console.log(
  //       "[ERROR][POST] sql error " + UserController.path + " : " +
  //         JSON.stringify(p),
  //     );
  //     console.error(e.message);
  //     res.status(500).send();
  //     return;
  //   }
  //   db.close();

  //   console.log(
  //     "[INFO][POST] data added on " + UserController.path + " : " +
  //       JSON.stringify(p),
  //   );
  //   res.status(200).send();
  // }
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

class User {
  name: string;
  family_name: string;
  email: string;
  password: string;
  basket: string;

  constructor(
    name: string,
    family_name: string,
    email: string,
    password: string,
    basket: string,
  ) {
    this.name = name;
    this.family_name = family_name;
    this.email = email;
    this.password = password;
    this.basket = basket;
  }
}

class UserEntry {
  id: number;
  name: string;
  family_name: string;
  email: string;
  password: string;
  basket: string;

  constructor(
    id: number,
    name: string,
    family_name: string,
    email: string,
    password: string,
    basket: string,
  ) {
    this.id = id;
    this.name = name;
    this.family_name = family_name;
    this.email = email;
    this.password = password;
    this.basket = basket;
  }
}
