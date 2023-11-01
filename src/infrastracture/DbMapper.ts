import AWS = require('aws-sdk');
import { IMapper } from './IMapper';
import { User } from '../domain/User';

export class DbUserMapper implements IMapper<User>  {
  constructor(private database:  AWS.DynamoDB.DocumentClient) {

  }

  async put(user: User): Promise<void> {
    this.database.put({ TableName: 'users', Item: { partition_key: user.getId(), ...user.mapToJson() } }, (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        console.log('DBSUCCESS', data);
        return true;
      }
    });

  }

  async get(): Promise<void> {

  }

  async patch(): Promise<void> {

  }

}
