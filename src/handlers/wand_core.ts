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
    const core = await store.show(req.body.id);
    res.json(core);
  } catch (e) {
    res.status(400).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const core: CoreData = {
    name: req.body.name,
    notes: req.body.notes,
  };

  try {
    const cores = await store.create(core);
    res.json(cores);
  } catch (e) {
    res.status(400).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const core: Core = {
    id: req.body.id,
    name: req.body.name,
    notes: req.body.notes,
  };

  try {
    const cores = await store.update(core);
    res.json(cores);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const cores = await store.delete(req.body.id);
    res.json(cores);
  } catch (e) {
    res.status(400).send(e);
  }
};

const wandCoreRoutes = (app: express.Application): void => {
  app.get('/cores', index);
  app.get('/cores/:id', show);
  app.post('/cores', verifyAuthToken, create);
  app.put('/cores/:id', verifyAuthToken, update);
  app.delete('/cores/:id', verifyAuthToken, remove);
};

export default wandCoreRoutes;
