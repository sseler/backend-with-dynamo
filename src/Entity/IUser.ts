import { UserSchema } from '../types';
import { User } from './User';

export type UserKeys = 'username' | 'password' | 'email'

export interface IUser {
    create(data: UserSchema): User,
    read():void,
    search(key:UserKeys): string,
    update(key: UserKeys, value: string): boolean
    getId(): string;
}
