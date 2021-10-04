import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const verifyAuthToken = (req: Request, res: Response, next: () => void): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, `${JWT_SECRET}`);
    next();
  } catch (error) {
    res.status(401);
  }
};

export const verifyIsOwner = (req: Request, res: Response, next: () => void): void => {
  const id = parseInt(req.params.id);

  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const decoded = jwt.verify(token, `${JWT_SECRET}`) as { id: number };
    if (decoded.id !== id) {
      throw new Error('User is not the owner.');
    }
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};
