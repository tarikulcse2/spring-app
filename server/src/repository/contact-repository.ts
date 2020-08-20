import { sequelize } from "../config/sequelize";
import { Contact } from "../models/contact";
export const contactRepo = sequelize.getRepository(Contact);;