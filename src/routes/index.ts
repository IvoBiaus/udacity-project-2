import express, { Request, Response } from 'express';
import orderRoutes from '../handlers/orders';
import userRoutes from '../handlers/user';
import wandRoutes from '../handlers/wand';
import wandCoreRoutes from '../handlers/wand_core';
import wandWoodRoutes from '../handlers/wand_wood';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.sendStatus(200));
routes.use('/', userRoutes);
routes.use('/orders', orderRoutes);
routes.use('/cores', wandCoreRoutes);
routes.use('/woods', wandWoodRoutes);
routes.use('/wands', wandRoutes);

export default routes;
