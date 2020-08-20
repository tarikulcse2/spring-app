import { Sequelize } from "sequelize-typescript";
import { Contact } from "../models/contact";

export const sequelize = new Sequelize({
  database: "test",
  dialect: "mysql",
  username: "root",
  password: "12345",
  storage: ":memory:",
  models: [Contact],
  repositoryMode: true,
});
