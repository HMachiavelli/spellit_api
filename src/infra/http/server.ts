import "module-alias/register";
import express, { Express, json } from "express";
import { createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { setupRoutes } from "./routes";
import { registerModules } from "@/infra/container";

const container = createContainer();

const app: Express = express();
app.use(json());

registerModules(container);
setupRoutes(app, container);

app.use(scopePerRequest(container));

app.listen(3000, () => console.log(`Server running at http://localhost:3000`));
