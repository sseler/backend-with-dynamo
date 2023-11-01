import { User } from '../domain/User';
import { SignupDto } from '../types';
import { DbUserMapper } from '../infrastracture/DbMapper';

export class BasicService {
  constructor(private dbMapper: DbUserMapper) {

  }

  public async signup({ username, email, password }: SignupDto) {
    console.log('IN SERVICE');
    const id = `${username}_${email}`; // in task that was writen not to use libraries, otherwise I would use uuidv4
    const user = new User(id, username, password, email);
    await this.dbMapper.put(user);
  }
}
