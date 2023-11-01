import { Request, Response } from 'express';
import { IAuth } from './IAuth';
import { BasicService } from '../services/BasicService';
import { LoginDto, RequestWithDto, SignupDto } from '../types';
import { UserKeys } from '../domain/IUser';
import { isParamUserKey } from '../utils/isParamUserKey';

// Todo => split to AuthController and OperationsController(?)
export class BasicController implements IAuth {

  constructor() {}

  public async signup(req: RequestWithDto<SignupDto>, res: Response, service: BasicService): Promise<void> {
    await service.signup(req.body)
      .then(() => {
        res.status(201).send('User signed up');
      }).catch((err) => res.status(500).send(err.message));

  }

  public async login(req: RequestWithDto<LoginDto>, res: Response, service: BasicService): Promise<void> {
    await service.login(req.body).then((authenticated) => {
      if (!authenticated) {
        res.status(400).send({ authenticated, message: 'Credentails does not maych' });
        return;
      }
      res.status(200).send({ authenticated });
    });
  }

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
    await service.searchKeyValue(req.params.userId, req.params.key as UserKeys)
      .then((value) => {
        res.status(200).send({ keyValue: value });
      })
      .catch((err) => res.status(500).send(err.message));
  }

  public async resetPassword(req: Request, res: Response): Promise<any> {
    // todo
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

}
