import { User } from '../domain/User';
import {  UserSchema } from '../types';

export class UserMapper {

  mapToDomain({ _id, username, password, email }: UserSchema): User {
    return new User(_id, username, password, email);

  }

  mapToDb(entity: User) {
    return { _id: entity.getId(), ...entity.mapToJson() };
  }
}
