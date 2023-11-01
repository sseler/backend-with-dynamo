import { User } from '../entity/User';
import { LoginDto, PasswordResetDto, SignupDto } from '../types';
import { DynamoUserMapper } from '../infrastracture/DynamoUserMapper';
import { UserKeys } from '../entity/IUser';

export class BasicService {
  constructor(private dbMapper: DynamoUserMapper) {}

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

  public async resetPassword(id: string, { oldPassword, newPassword }: PasswordResetDto) {
    const user = await this.dbMapper.get(id);
    const isValid = user.update(oldPassword, newPassword);
    if (!isValid) {
      throw new Error('Old password does not match');
    }
    await this.dbMapper.update(user);
  }

  public async delete(id: string) {
    await this.dbMapper.delete(id);
    return true;

  }
}
