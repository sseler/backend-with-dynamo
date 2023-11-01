import { User } from '../domain/User';

export interface IMapper<T> {
    put(data: T):Promise<void>;
    get(id: string):Promise<User | null>;
    patch():Promise<void>;
}
