export interface IUser {
    create(): void,
    read():void,
    search(): void,
    delete(): void,
    update():void
    getId(): string;
}
