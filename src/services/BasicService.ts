import { User } from '../domain/User';
import { LoginDto, SignupDto } from '../types';
import { DbUserMapper } from '../infrastracture/DbMapper';
import { UserKeys } from '../domain/IUser';

export class BasicService {
  constructor(private dbMapper: DbUserMapper) {

  }

  public async signup({ username, email, password }: SignupDto) {
    const id = `${username}_${email}`; // in task that was writen not to use libraries, otherwise I would use uuidv4
    const user = new User(id, username, password, email);
    await this.dbMapper.put(user);
  }

  public async login({ username, password }: LoginDto) {
    const authenticated = await this.dbMapper.login(username, password);

    return authenticated;
  }

  public async getByUserId(id: string) {
    const user = await this.dbMapper.get(id);
    return user.read();
  }

  public async searchKeyValue(id: string, key: UserKeys) {
    const user = await this.dbMapper.get(id);
    const keyValue = user.search(key);
    return keyValue;
  }

  public async passwordReset(id: string, value: string) {
    const user = await this.dbMapper.get(id);
    const isValid = user.validatePassword(value);
  }
}
