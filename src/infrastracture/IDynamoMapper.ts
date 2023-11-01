import { User } from '../Entity/User';

export interface IDynamoMapper<T> {
    put(data: T):Promise<void>;
    get(id: string):Promise<User>;
    delete(id: string): Promise<void>
    update(user: User):Promise<void>;
}
