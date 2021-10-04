import { Request } from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const getUidFromToken = (req: Request): number => {
  const token = req.headers.authorization?.split(' ')[1] || '';
  const decoded = jwt.verify(token, `${JWT_SECRET}`) as { id: number };
  return decoded.id;
};
