import { Request, Response } from 'express';
import { BasicService } from '../services/BasicService';
import { isParamUserKey } from '../utils/isParamUserKey';
import { IEntity } from './IEntity';

export class EntityController implements IEntity {

  constructor() {}

  public async searchKeyValue(req: Request, res: Response, service: BasicService) {
    if (!req.params.userId) {
      res.status(400).send('UserId not provided');
      return;
    }
    if (!req.params.key) {
      res.status(400).send('Key not provided');
      return;
    }

    if (!isParamUserKey(req.params.key)) {
      res.status(400).send('Wrong key provided');
      return;
    }
    await service.searchKeyValue(req.params.userId, req.params.key)
      .then((value) => {
        res.status(200).send({ keyValue: value });
      })
      .catch((err) => res.status(500).send(err.message));
  }

  public async getUserById(req: Request, res: Response, service: BasicService): Promise<void> {
    if (!req.params.userId) {
      res.status(400).send('UserId not provided');
      return;
    }
    await service.getByUserId(req.params.userId).then((data) => {
      res.status(200).send(data);
    }).catch((err) => res.status(500).send(err.message));
  }

  public async delete(req: Request, res: Response, service: BasicService): Promise<void> {
    if (!req.params.userId) {
      res.status(400).send('UserId not provided');
      return;
    }

    await service.delete(req.params.userId)
      .then(() => {
        res.status(200).send(`User with ${req.params.userId} deleted`);
      })
      .catch((err) => res.status(500).send(err.message));
  }

}
