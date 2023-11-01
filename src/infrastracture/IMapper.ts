export interface IMapper<T> {
    put(data: T):Promise<void>;
    get():Promise<void>;
    patch():Promise<void>;
}
