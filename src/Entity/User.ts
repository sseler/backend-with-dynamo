import { UserSchema } from '../types';
import { IUser, UserKeys } from './IUser';

export class User implements IUser {

  constructor(
    private id: string,
    private username: string,
    private password: string,
    private email: string
  ) {

  }

  getId() {
    return this.id;
  }

  read() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email
    };
  }

  create({ id, username, password, email }: UserSchema): User {
    return new User(id, username, password, email);
  }

  search(key: UserKeys): string {
    return this[key];
  }

  update(oldPassword: string, newPassword: string): boolean {
    const isValid = this.validatePassword(oldPassword);
    if (isValid) {
      this.password = newPassword;
      return true;
    }
    return false;

  }

  private validatePassword(value: string) {
    return this.password === value;
  }
}
