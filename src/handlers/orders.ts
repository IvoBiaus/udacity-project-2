import express, { Request, Response } from 'express';
import { getUidFromToken } from '../helpers';
import { verifyAuthToken } from '../middlewares';
import { Order, OrderData, OrderStore } from '../models/orders';

const store = new OrderStore();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = await getUidFromToken(req);
    const orders = await store.index(uid);
    res.json(orders);
  } catch (e) {
    res.status(400).send(e);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = await getUidFromToken(req);
    const order = await store.show(parseInt(req.params.id), uid);
    res.json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = await getUidFromToken(req);
    const order: OrderData = {
      user_id: uid,
      wands_amount: req.body.wands_amount,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (e) {
    res.status(400).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = await getUidFromToken(req);

    const order: Order = {
      id: parseInt(req.params.id),
      user_id: uid,
      complete: false,
      wands_amount: req.body.wands_amount,
    };

    await store.update(order);

    res.json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const complete = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = await getUidFromToken(req);
    await store.complete(parseInt(req.params.id), uid);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
};

const completedByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = await getUidFromToken(req);
    const orders = await store.completedByUser(uid);
    res.json(orders);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = await getUidFromToken(req);
    const order = await store.delete(parseInt(req.params.id), uid);
    res.json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const orderRoutes = express.Router();

orderRoutes.get('/', verifyAuthToken, index);
orderRoutes.get('/completed', verifyAuthToken, completedByUser);
orderRoutes.get('/:id', verifyAuthToken, show);
orderRoutes.post('/', verifyAuthToken, create);
orderRoutes.put('/:id', verifyAuthToken, update);
orderRoutes.put('/:id/complete', verifyAuthToken, complete);
orderRoutes.delete('/:id', verifyAuthToken, remove);

export default orderRoutes;
