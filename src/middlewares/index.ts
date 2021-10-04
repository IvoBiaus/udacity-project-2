import { Request, Response } from 'express';
import { getUidFromToken } from '../helpers';

export const verifyAuthToken = (req: Request, res: Response, next: () => void): void => {
  try {
    getUidFromToken(req);
    next();
  } catch (error) {
    res.status(401);
  }
};

export const verifyIsOwner = (req: Request, res: Response, next: () => void): void => {
  const id = parseInt(req.params.id);

  try {
    const tokenId = getUidFromToken(req);
    if (tokenId !== id) {
      throw new Error('User is not the owner.');
    }
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};
