import { IUser } from './IUser';

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

  mapToJson() {
    return {
      username: this.username,
      password: this.password,
      email: this.email
    };
  }

  create(): void {

  }

  read(): void {

  }

  search(): void {

  }

  delete(): void {

  }

  update(): void {

  }
}
