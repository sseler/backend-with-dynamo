import { Response } from 'express';
import { IAuth } from './IAuth';
import { BasicService } from '../services/BasicService';
import { LoginDto, PasswordResetDto, RequestWithDto, SignupDto } from '../types';

export class AuthController implements IAuth {

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
        res.status(400).send({ authenticated, message: 'Credentails does not match' });
        return;
      }
      res.status(200).send({ authenticated });
    });
  }

  public async resetPassword(req: RequestWithDto<PasswordResetDto>, res: Response, service: BasicService): Promise<any> {
    if (!req.params.userId) {
      res.status(400).send('UserId not provided');
      return;
    }
    await service.resetPassword(req.params.userId, req.body)
      .then(() => {
        res.status(201).send('Password changed');
      }).catch((err) => res.status(500).send(err.message));
  }

}
