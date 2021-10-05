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
    const user = await store.show(parseInt(req.params.id));
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
    await store.update(user, id);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
};
const userRoutes = express.Router();

userRoutes.get('/users', verifyAuthToken, index);
userRoutes.get('/users/:id', verifyAuthToken, show);
userRoutes.get('/login', authenticate);
userRoutes.post('/users', create);
userRoutes.put('/users/:id', verifyIsOwner, update);

export default userRoutes;
