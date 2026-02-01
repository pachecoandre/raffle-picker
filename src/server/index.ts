import express from "express";
import cors from "cors";
import ip from "ip";
import v1Routes from "../router";

export default class Server {
  private app: express.Application;
  public storage: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }
  route = () => {
    this.app.use("/v1", v1Routes);
  };
  listen = (port: string | number) => {
    this.app.listen(Number(port), () =>
      console.log(`Server running on ${ip.address()}:${port}`),
    );
  };
}
