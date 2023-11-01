import { Request, Response } from 'express';
import { LoginDto, RequestWithDto, SignupDto } from '../types';
import { BasicService } from '../services/BasicService';

export interface IAuth {
    signup(req: RequestWithDto<SignupDto>, res: Response, service: BasicService): Promise<void>;
    login(req: RequestWithDto<LoginDto>, res: Response, service: BasicService): Promise<void>;
    resetPassword(req: Request, res: Response):Promise<any>;
}
