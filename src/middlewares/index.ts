import { Request, Response } from 'express';
import { getUidFromToken } from '../helpers';

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: () => void,
): Promise<void> => {
  try {
    await getUidFromToken(req);
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};

export const verifyIsOwner = async (
  req: Request,
  res: Response,
  next: () => void,
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const tokenId = await getUidFromToken(req);
    if (tokenId !== id) {
      throw new Error('User is not the owner.');
    }
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};
