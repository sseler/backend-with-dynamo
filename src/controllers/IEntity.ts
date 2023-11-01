import { Request, Response } from 'express';
import { BasicService } from '../services/BasicService';

export interface IEntity {
    delete(req: Request, res: Response, service: BasicService): Promise<void>;
    searchKeyValue(req: Request, res: Response, service: BasicService): Promise<void>;
    getUserById(req: Request, res: Response, service: BasicService): Promise<void>;
}
