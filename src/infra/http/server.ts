import 'module-alias/register'
import express, { Express } from 'express';
import { setupRoutes } from './routes';

const app: Express = express();

setupRoutes(app);

app.listen(3000, () => console.log(`Server running at http://localhost:3000`));