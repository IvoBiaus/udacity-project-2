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
    const wand = await store.show(parseInt(req.params.id));
    res.json(wand);
  } catch (e) {
    res.status(400).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const wandData: WandData = {
    wood_id: req.body.wood_id,
    length: req.body.length,
    core_id: req.body.core_id,
    flexibility: req.body.flexibility,
    notes: req.body.notes,
    price: req.body.price,
  };

  try {
    const wand = await store.create(wandData);
    res.json(wand);
  } catch (e) {
    res.status(400).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const wand: Wand = {
    id: parseInt(req.params.id),
    wood_id: req.body.wood_id,
    length: req.body.length,
    core_id: req.body.core_id,
    flexibility: req.body.flexibility,
    notes: req.body.notes,
    price: req.body.price,
  };

  try {
    await store.update(wand);
    res.json(wand);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const wand = await store.delete(parseInt(req.params.id));
    res.json(wand);
  } catch (e) {
    res.status(400).send(e);
  }
};

const wandRoutes = express.Router();

wandRoutes.get('/', index);
wandRoutes.get('/:id', show);
wandRoutes.post('/', verifyAuthToken, create);
wandRoutes.put('/:id', verifyAuthToken, update);
wandRoutes.delete('/:id', verifyAuthToken, remove);

export default wandRoutes;
