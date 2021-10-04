import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middlewares';

import { Wood, WoodData, WandWoodStore } from '../models/wand_wood';

const store = new WandWoodStore();

const index = async (_: Request, res: Response): Promise<void> => {
  try {
    const woods = await store.index();
    res.json(woods);
  } catch (e) {
    res.status(400).json(e);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const woods = await store.show(req.body.id);
    res.json(woods);
  } catch (e) {
    res.status(400).json(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const wood: WoodData = {
    name: req.body.name,
    genus: req.body.genus,
    notes: req.body.notes,
  };

  try {
    const woods = await store.create(wood);
    res.json(woods);
  } catch (e) {
    res.status(400).json(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const wood: Wood = {
    id: req.body.id,
    name: req.body.name,
    genus: req.body.genus,
    notes: req.body.notes,
  };

  try {
    const woods = await store.update(wood);
    res.json(woods);
  } catch (e) {
    res.status(400).json(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const woods = await store.delete(req.body.id);
    res.json(woods);
  } catch (e) {
    res.status(400).json(e);
  }
};

const wandWoodRoutes = (app: express.Application): void => {
  app.get('/woods', index);
  app.get('/woods/:id', show);
  app.post('/woods', verifyAuthToken, create);
  app.put('/woods/:id', verifyAuthToken, update);
  app.delete('/woods/:id', verifyAuthToken, remove);
};

export default wandWoodRoutes;
