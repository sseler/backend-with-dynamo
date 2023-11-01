export type UserKeys = 'id' | 'username' | 'password' | 'email'

export interface IUser {
    create(): void,
    read():void,
    search(key:UserKeys): string,
    delete(): void,
    update(key: UserKeys, value: string): void
    getId(): string;
}
