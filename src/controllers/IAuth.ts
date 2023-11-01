import { Request, Response } from 'express';
import { RequestWithDto, SignupDto } from '../types';
import { BasicService } from '../services/BasicService';

export interface IAuth {
    signup(req: RequestWithDto<SignupDto>, res: Response, service: BasicService): Promise<void>;
    login(req: Request, res: Response): Promise<any>;
    resetPassword(req: Request, res: Response):Promise<any>;
}
