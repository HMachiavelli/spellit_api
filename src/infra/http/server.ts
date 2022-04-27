import "module-alias/register";
import express, { Express, json } from "express";
import cors from "cors";
import { createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import requestIp from "request-ip";
import { setupRoutes } from "./routes";
import { registerModules } from "@/infra/container";
import errorMiddleware from "@/infra/http/middlewares/error";
import setupPassport from "./middlewares/passport";

const container = createContainer();

setupPassport();

const app: Express = express();
app.use(cors());
app.use(json());
app.use(requestIp.mw());

registerModules(container);
setupRoutes(app, container);

app.use(scopePerRequest(container));
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running at port ${port}`));
