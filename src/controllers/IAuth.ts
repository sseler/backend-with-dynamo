import { Response } from 'express';
import { LoginDto, PasswordResetDto, RequestWithDto, SignupDto } from '../types';
import { BasicService } from '../services/BasicService';

export interface IAuth {
    signup(req: RequestWithDto<SignupDto>, res: Response, service: BasicService): Promise<void>;
    login(req: RequestWithDto<LoginDto>, res: Response, service: BasicService): Promise<void>;
    resetPassword(req: RequestWithDto<PasswordResetDto>, res: Response, service: BasicService):Promise<void>;
}
