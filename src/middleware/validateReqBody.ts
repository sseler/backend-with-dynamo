import { NextFunction, Request, Response } from 'express';

export const isValidSignupReq = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return  res.status(400).send('Missing required fields');
  }

  if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return  res.status(400).send('Invalid data types');
  }

  next();
};

export const isValidLoginReq = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return  res.status(400).send('Missing required fields');
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return  res.status(400).send('Invalid data types');
  }

  next();
};

export const isValidPasswordResetReq = (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return  res.status(400).send('Missing required fields');
  }

  if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
    return  res.status(400).send('Invalid data types');
  }

  next();
};
