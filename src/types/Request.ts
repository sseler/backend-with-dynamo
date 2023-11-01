import { Request } from 'express';

export type RequestWithDto<T> =  Omit<Request, 'body'> & {body: T}
