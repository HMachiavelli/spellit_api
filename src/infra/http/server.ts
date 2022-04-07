import "module-alias/register";
import express, { Express, json } from "express";
import cors from "cors";
import { createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { setupRoutes } from "./routes";
import { registerModules } from "@/infra/container";

const container = createContainer();

const app: Express = express();
app.use(cors());
app.use(json());

registerModules(container);
setupRoutes(app, container);

app.use(scopePerRequest(container));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running at port ${port}`));
