import AWS = require('aws-sdk');
import { IMapper } from './IMapper';
import { User } from '../domain/User';

export class DbUserMapper implements IMapper<User>  {
  constructor(private database:  AWS.DynamoDB.DocumentClient) {

  }

  async put(user: User): Promise<void> {
    await this.database.scan({ TableName: 'users' }).promise().then(async (data) => {
      const exists = !!(data.Items?.filter((item) => item.pk === user.getId()).length);
      if (exists) {
        throw new Error('User already exists');
      }
      await this.database.put({ TableName: 'users', Item: { pk: user.getId(), sk: user.getId(), ...user.read() } }).promise()
        .then(() => true).catch((err) =>  { throw new Error(err.message); });
    });
  }

  async get(id: string): Promise<User> {
    const users =  await this.database.scan({ TableName: 'users' }).promise();
    if (!users) {
      throw new Error('Users collection does not contain any items');
    }
    const user = users.Items?.find((item) => item.pk === id);
    if (!user) {
      throw new Error(`User with ${id} not exist`);
    }

    const userEntity = this.mapAttributeMapToEntity(user);
    return userEntity;
  }

  async patch(): Promise<void> {

  }

  async login(username: string, password: string):Promise<boolean> {
    const users =  await this.database.scan({ TableName: 'users' }).promise();
    if (!users) {
      throw new Error('Users collection does not contain any items');
    }
    const user = users.Items?.find((item) => item.username === username && item.password === password);
    if (!user) {
      return false;
    }

    return true;
  }

  private mapAttributeMapToEntity(user: AWS.DynamoDB.DocumentClient.AttributeMap): User {
    const requiredKeys = ['pk', 'username', 'password', 'email'];
    const valid = requiredKeys.every((key) => Object.keys(user).includes(key));
    if (!valid) {
      throw new Error('Returned item does not match schema');
    }
    return new User(user.pk,  user.username, user.password, user.email);
  }

}
