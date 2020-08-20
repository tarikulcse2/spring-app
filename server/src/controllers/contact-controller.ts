import * as express from "express";
import { Contact } from "../models/contact";
import { IResponse } from "../config/response";
import { sequelize } from "../config/sequelize";
import { contactRepo } from "../repository/contact-repository";

class ContactController {
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get("/", this.getAllContacts);
    this.router.get("/getById/:id", this.getContactById);
    this.router.get("/getByMobile/:mobile", this.getContactByMobile);
    this.router.post("/create", this.createContact);
    this.router.put("/update/:id", this.Update);
    this.router.delete("/delete/:id", this.Delete);
  }

  private getAllContacts = (
    request: express.Request,
    response: express.Response
  ) => {
    contactRepo
      .findAll()
      .then((obj) => {
        return response.send({
          status: true,
          message: "Data has been loaded",
          result: obj,
        } as IResponse);
      })
      .catch((err) =>
        response.send({
          status: false,
          message: "Data can not read",
          result: err,
        } as IResponse)
      );
  };

  private getContactById = async (
    request: express.Request,
    response: express.Response
  ) => {
    let id = request.params.id;
    contactRepo
      .findOne({ where: { id: id } })
      .then((obj) => {
        return response.send({
          status: true,
          message: "Data has been loaded",
          result: obj,
        } as IResponse);
      })
      .catch((err) =>
        response.send({
          status: false,
          message: "Data can not read",
          result: err,
        } as IResponse)
      );
  };

  private getContactByMobile = async (
    request: express.Request,
    response: express.Response
  ) => {
    let mobile = request.params.mobile;
    contactRepo
      .findOne({ where: { mobile: mobile } })
      .then((obj) => {
        return response.send({
          status: true,
          message: "Data has been loaded",
          result: obj,
        } as IResponse);
      })
      .catch((err) =>
        response.send({
          status: false,
          message: "Data can not read",
          result: err,
        } as IResponse)
      );
  };

  private createContact = (
    request: express.Request,
    response: express.Response
  ) => {
    let con = request.body as Contact;

    this.validations(con, response);

    contactRepo
      .create(con)
      .then((c) => {
        return response.send({
          status: true,
          message: "Data has been save successfully",
          result: c,
        } as IResponse);
      })
      .catch((err) =>
        response.send({
          status: false,
          message: "Save failed",
          result: null,
        } as IResponse)
      );
  };

  private Update = (request: express.Request, response: express.Response) => {
    const con = request.body as Contact;
    contactRepo
      .update(con, { where: { id: request.params.id }, returning: true })
      .then((r) => {
        contactRepo
          .findOne({ where: { id: request.params.id } })
          .then((res) => {
            return response.send({
              status: true,
              message: "Data has been update successfully",
              result: res,
            } as IResponse);
          });
      })
      .catch((err) =>
        response.send({
          status: false,
          message: "Update failed",
          result: null,
        } as IResponse)
      );
  };

  private Delete = (request: express.Request, response: express.Response) => {
    const btc = contactRepo
      .destroy({ where: { id: request.params.id } })
      .then((st) => {
        return response.send({
          status: true,
          message: "Data has been delete successfully",
          result: st,
        } as IResponse);
      })
      .catch((err) =>
        response.send({
          status: false,
          message: "Delete failed",
          result: null,
        } as IResponse)
      );
  };

  private validations(con: Contact, response: express.Response) {
    if (!con.name && !con.mobile)
      response.send({
        status: false,
        result: null,
        message: "name and mobile is required",
      } as IResponse);

    if (!con.name)
      response.send({
        status: false,
        result: null,
        message: "name is required",
      } as IResponse);

    if (!con.mobile)
      response.send({
        status: false,
        result: null,
        message: "mobile is required",
      } as IResponse);

    let validation = con.mobile.match(/^(?:\+88|88)?(01[3-9]\d{8})$/);

    if (!validation)
      response.send({
        status: false,
        result: null,
        message: "mobile not valid",
      } as IResponse);
  }
}

export default new ContactController();
