import express, { Request, Response } from 'express';
import { UserData, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken, verifyIsOwner } from '../middlewares';

const { JWT_SECRET } = process.env;
const store = new UserStore();

const index = async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.show(req.body.id);
    res.json(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const credentials: UserData = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await store.authenticate(credentials);
    const token = jwt.sign({ user }, `${JWT_SECRET}`);
    res.json(token);
  } catch (e) {
    res.status(401).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user: UserData = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const newUser = await store.create(user);
    const tkn = jwt.sign({ user: newUser }, `${JWT_SECRET}`);

    res.json(tkn);
  } catch (e) {
    res.status(400).json(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const user: UserData = {
    username: req.body.username,
    password: req.body.password,
  };

  const id = parseInt(req.params.id);

  try {
    const updated = await store.update(user, id);
    res.json(updated);
  } catch (e) {
    res.status(400).send(e);
  }
};

const userRoutes = (app: express.Application): void => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.get('/login', authenticate);
  app.post('/users', create);
  app.put('/users/:id', verifyIsOwner, update);
};

export default userRoutes;
