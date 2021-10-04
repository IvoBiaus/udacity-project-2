import express, { Request, Response } from 'express';

import wandCoreRoutes from './handlers/wand_core';
import wandRoutes from './handlers/wand';
import wandWoodRoutes from './handlers/wand_wood';
import userRoutes from './handlers/user';
import orderRoutes from './handlers/orders';

const app = express();
const address = '0.0.0.0:3000';

app.use(express.json());

app.get('/', function (_: Request, res: Response) {
  res.send('Hello World!');
});

orderRoutes(app);
userRoutes(app);
wandCoreRoutes(app);
wandRoutes(app);
wandWoodRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
