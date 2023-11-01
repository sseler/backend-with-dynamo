import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { IDynamoMapper } from './IDynamoMapper';
import { User } from '../Entity/User';

export class DynamoUserMapper implements IDynamoMapper<User>  {
  constructor(private dbClient:  DynamoDBClient) {}

  async put(user: User): Promise<void> {
    const putCommand = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: user,
    });
    const getCommand = new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: user.getId(),
      },
    });

    await this.dbClient.send(getCommand)
      .then(async (data) => {
        if (data.Item) {
          throw new Error('User already exists');
        }
        await this.dbClient.send(putCommand)
          .then(() => true)
          .catch((err) =>  { throw new Error(err.message); });
      })
      .catch((err) => { throw new Error(err.message); });
  }

  async get(id: string): Promise<User> {
    const getCommand = new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id },

    });
    const user = await this.dbClient.send(getCommand)
      .then((data) => {
        if (!data.Item) {
          throw new Error('User not found');
        }
        return data.Item;
      })
      .catch((err) => { throw new Error(err.message); });
    const userEntity = this.mapAttributeMapToEntity(user);
    return userEntity;
  }

  async login(username: string, password: string):Promise<boolean> {
    const getCommand = new ScanCommand({
      TableName: process.env.TABLE_NAME,
      ProjectionExpression: 'username, password',
    });
    const authenticated = await this.dbClient.send(getCommand)
      .then((data) => {
        if (!data.Items) {
          return false;
        }
        return !!(data.Items
          ?.filter((item) => (item.username?.S && item.password?.S)
          && item.username.S === username && item.password.S === password).length);
      })
      .catch((err) => { throw new Error(err.message); });

    if (!authenticated) {
      return false;
    }
    return true;
  }

  async delete(id: string) {
    const command = new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id },
    });
    const getCommand = new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id },

    });
    await this.dbClient.send(getCommand)
      .then(async (data) => {
        if (!data.Item) {
          throw new Error('User not found');
        }
        await this.dbClient.send(command)
          .catch((err) => { throw new Error(err.message); });
      })
      .catch((err) => { throw new Error(err.message); });
  }

  async update(user: User) {
    const command = new UpdateCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: user.getId()
      },
      UpdateExpression: 'set password = :password',
      ExpressionAttributeValues: {
        ':password': user.read().password
      },
      ReturnValues: 'ALL_NEW'
    });

    await this.dbClient.send(command)
      .catch((err) =>  { throw new Error(err.message); });
  }

  private mapAttributeMapToEntity(user: Record<string, any>): User {
    const requiredKeys = ['id', 'username', 'password', 'email'];
    const valid = requiredKeys.every((key) => Object.keys(user).includes(key));
    if (!valid) {
      throw new Error('Returned item does not match schema');
    }
    return new User(user.id,  user.username, user.password, user.email);
  }

}
