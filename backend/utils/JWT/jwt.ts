import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config/config';

export const generateAccessToken = (username: string) => {
  return jwt.sign(username, TOKEN_SECRET, { expiresIn: '7d' });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    // req.user = user;

    next();
  });
};
