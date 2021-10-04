import express, { Request, Response } from 'express';
import { getUidFromToken } from '../helpers';
import { verifyAuthToken } from '../middlewares';
import { Order, OrderData, OrderStore } from '../models/orders';

const store = new OrderStore();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    // const uid = getUidFromToken(req);
    const orders = await store.index(4);
    res.json(orders);
  } catch (e) {
    res.status(400).send(e);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  const uid = getUidFromToken(req);

  try {
    const order = await store.show(req.body.id, uid);
    res.json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const uid = getUidFromToken(req);

  const order: OrderData = {
    user_id: uid,
    wands_amount: req.body.wands_amount,
  };

  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (e) {
    res.status(400).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const uid = getUidFromToken(req);

  const order: Order = {
    id: req.body.id,
    user_id: uid,
    complete: false,
    wands_amount: req.body.wands_amount,
  };

  try {
    const updatedOrder = await store.update(order);
    res.json(updatedOrder);
  } catch (e) {
    res.status(400).send(e);
  }
};

const complete = async (req: Request, res: Response): Promise<void> => {
  const uid = getUidFromToken(req);

  try {
    const order = await store.complete(req.body.id, uid);
    res.json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const completedByUser = async (req: Request, res: Response): Promise<void> => {
  const uid = getUidFromToken(req);

  try {
    const orders = await store.completedByUser(uid);
    res.json(orders);
  } catch (e) {
    res.status(400).send(e);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  const uid = getUidFromToken(req);

  try {
    const order = await store.delete(req.body.id, uid);
    res.json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.get('/orders', index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.get('/orders/:id/completed', verifyAuthToken, completedByUser);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.put('/orders/:id/complete', verifyAuthToken, complete);
  app.delete('/orders/:id', verifyAuthToken, remove);
};

export default orderRoutes;
