import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as csrf from "csurf";
import * as logger from "morgan";
import * as helmet from "helmet";
import routes from "./routers/routes";
import { sequelize } from "./config/sequelize";

class Main {
  app: express.Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.routers();
    sequelize.sync({force: true});
  }

  middleware() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  routers() {
    this.app.use("/api", routes);
  }
}

export default new Main().app;
