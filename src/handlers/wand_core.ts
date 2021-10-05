import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middlewares';

import { Core, CoreData, WandCoreStore } from '../models/wand_core';

const store = new WandCoreStore();

const index = async (_: Request, res: Response): Promise<void> => {
  try {
    const cores = await store.index();
    res.json(cores);
  } catch (e) {
    res.status(400).send(e);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const core = await store.show(parseInt(req.params.id));
    res.json(core);
  } catch (e) {
    res.status(400).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const coreData: CoreData = {
    name: req.body.name,
    notes: req.body.notes,
  };

  try {
    const core = await store.create(coreData);
    res.json(core);
  } catch (e) {
    res.status(400).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const core: Core = {
    id: parseInt(req.params.id),
    name: req.body.name,
    notes: req.body.notes,
  };

  try {
    await store.update(core);
    res.json(core);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const core = await store.delete(parseInt(req.params.id));
    res.json(core);
  } catch (e) {
    res.status(400).send(e);
  }
};

const wandCoreRoutes = express.Router();

wandCoreRoutes.get('/', index);
wandCoreRoutes.get('/:id', show);
wandCoreRoutes.post('/', verifyAuthToken, create);
wandCoreRoutes.put('/:id', verifyAuthToken, update);
wandCoreRoutes.delete('/:id', verifyAuthToken, remove);

export default wandCoreRoutes;
