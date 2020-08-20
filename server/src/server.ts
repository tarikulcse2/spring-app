import { Request, Response } from "express";
import app from "./main";

const { PORT = 3030 } = process.env;
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world"
  });
});

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});