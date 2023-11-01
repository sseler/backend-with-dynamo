import { UserKeys } from '../entity/IUser';

export const isParamUserKey = (key: string): key is UserKeys => {
  return ['username', 'password', 'email'].includes(key);
};
