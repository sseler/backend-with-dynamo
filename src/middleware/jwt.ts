import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token == null) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, user: any) => {

    if (err) return res.sendStatus(403);

    next();
  });
}
