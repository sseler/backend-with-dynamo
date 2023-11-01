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
      username: this.username,
      password: this.password,
      email: this.email
    };
  }

  create(): void {

  }

  search(key: UserKeys): string {
    return this[key];
  }

  delete(): void {

  }

  update(value: string): void {
    this.password = value;
  }

  validatePassword(value: string) {
    return this.password === value;
  }
}
