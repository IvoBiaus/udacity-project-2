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
    const wood = await store.show(parseInt(req.params.id));
    res.json(wood);
  } catch (e) {
    res.status(400).json(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const woodData: WoodData = {
    name: req.body.name,
    genus: req.body.genus,
    notes: req.body.notes,
  };

  try {
    const wood = await store.create(woodData);
    res.json(wood);
  } catch (e) {
    res.status(400).json(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const wood: Wood = {
    id: parseInt(req.params.id),
    name: req.body.name,
    genus: req.body.genus,
    notes: req.body.notes,
  };

  try {
    await store.update(wood);
    res.json(wood);
  } catch (e) {
    res.status(400).json(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const wood = await store.delete(parseInt(req.params.id));
    res.json(wood);
  } catch (e) {
    res.status(400).json(e);
  }
};

const wandWoodRoutes = express.Router();

wandWoodRoutes.get('/', index);
wandWoodRoutes.get('/:id', show);
wandWoodRoutes.post('/', verifyAuthToken, create);
wandWoodRoutes.put('/:id', verifyAuthToken, update);
wandWoodRoutes.delete('/:id', verifyAuthToken, remove);

export default wandWoodRoutes;
