import { Request, Response } from 'express';
import { IAuth } from './IAuth';
import { BasicService } from '../services/BasicService';
import { RequestWithDto, SignupDto } from '../types';
import { docClient } from '../infrastracture/aws-client';
import { DbUserMapper } from '../infrastracture/DbMapper';

export class BasicController implements IAuth {

  constructor() {}

  public async signup(req: RequestWithDto<SignupDto>, res: Response, service: BasicService): Promise<void> {
    // const database = new DbUserMapper(docClient);
    // const basicService = new BasicService(database);
    // console.log(basicService);
    console.log(service);
    await service.signup(req.body)
      .then(() => {
        res.status(201).send('User signed up');
      }).catch((err) => res.sendStatus(500).send(err.message));

  }

  public async login(req: Request, res: Response): Promise<any> {

  }

  public async resetPassword(req: Request, res: Response): Promise<any> {

  }

}
