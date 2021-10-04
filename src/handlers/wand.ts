import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middlewares';

import { Wand, WandData, WandStore } from '../models/wand';

const store = new WandStore();

const index = async (_: Request, res: Response): Promise<void> => {
  try {
    const wands = await store.index();
    res.json(wands);
  } catch (e) {
    res.status(400).send(e);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const wands = await store.show(req.body.id);
    res.json(wands);
  } catch (e) {
    res.status(400).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const wand: WandData = {
    wood_id: req.body.wood_id,
    length: req.body.length,
    core_id: req.body.core_id,
    flexibility: req.body.flexibility,
    notes: req.body.notes,
    price: req.body.price,
  };

  try {
    const wands = await store.create(wand);
    res.json(wands);
  } catch (e) {
    res.status(400).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const wand: Wand = {
    id: req.body.id,
    wood_id: req.body.wood_id,
    length: req.body.length,
    core_id: req.body.core_id,
    flexibility: req.body.flexibility,
    notes: req.body.notes,
    price: req.body.price,
  };

  try {
    const wands = await store.update(wand);
    res.json(wands);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const wands = await store.delete(req.body.id);
    res.json(wands);
  } catch (e) {
    res.status(400).send(e);
  }
};

const wandRoutes = (app: express.Application): void => {
  app.get('/wands', index);
  app.get('/wands/:id', show);
  app.post('/wands', verifyAuthToken, create);
  app.put('/wands/:id', verifyAuthToken, update);
  app.delete('/wands/:id', verifyAuthToken, remove);
};

export default wandRoutes;
