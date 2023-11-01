import { UserKeys } from '../domain/IUser';

export const isParamUserKey = (key: string): key is UserKeys => {
  return ['id', 'username', 'password', 'email'].includes(key);
};
