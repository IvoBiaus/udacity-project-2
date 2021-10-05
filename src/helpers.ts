import { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from './models/user';

dotenv.config();

const { JWT_SECRET } = process.env;

export const getUidFromToken = async (req: Request): Promise<number> => {
  if (!req.headers.authorization) {
    throw new Error('Empty auth headers.');
  }

  const token = req.headers.authorization.split(' ')[1];
  const decoded = (await jwt.verify(token, JWT_SECRET as jwt.Secret)) as {
    user: User;
  };

  return decoded.user.id;
};
