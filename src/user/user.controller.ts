import { IncomingMessage, ServerResponse } from "http";
import UserService from "./user.service";
import User from "./user.entity";
import { validate as uuidValidate } from "uuid";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req: IncomingMessage, res: ServerResponse) {
    try {
      const users = await this.userService.getUsers();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      if (!uuidValidate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Provided id is incorrect" }));
      }

      const user = await this.userService.getUser(id);
      if (user) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User with this id does not exit" }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: вынести
  validateUserRequiredFields(user: Partial<User>) {
    const missedFields = [];

    if (user.username === undefined) {
      missedFields.push("username");
    }

    if (user.age === undefined) {
      missedFields.push("age");
    }

    if (user.hobbies === undefined) {
      missedFields.push("hobbies");
    }

    if (missedFields.length > 0) {
      return `Required fields (${missedFields.join(", ")}) must be provided`;
    }

    return null;
  }

  async createUser(req: IncomingMessage, res: ServerResponse) {
    try {
      let rawData = "";
      req.on("data", (data) => {
        rawData += data;
      });

      req.on("end", async () => {
        const parsedRawData = JSON.parse(rawData) as User;

        const user = new User(parsedRawData.username, parsedRawData.age, parsedRawData.hobbies);
        const errorMessage = this.validateUserRequiredFields(user);

        if (errorMessage) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            message: errorMessage
          }));
        }

        const isUserCreated = await this.userService.createUser(user);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(isUserCreated));
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      if (!uuidValidate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Provided id is incorrect" }));
      }

      let rawData = "";
      req.on("data", (data) => {
        rawData += data;
      });

      req.on("end", async () => {
        const user = JSON.parse(rawData) as User;
        const isUserUpdated = await this.userService.updateUser(id, user);

        if (isUserUpdated) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(isUserUpdated));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "User with this id does not exit" })
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
      if (!uuidValidate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Provided id is incorrect" }));
      }

      const isUserDeleted = await this.userService.deleteUser(id);

      if (isUserDeleted) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(isUserDeleted));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User with this id does not exit" }));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
