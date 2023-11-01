import { DynamoDBClient, CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { logger } from '../utils/logs';

const configuration = {
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId!,
    secretAccessKey: process.env.secretAccessKey!,
  }
};

export const client = new DynamoDBClient({
  ...configuration
});

export const initTable = async() => {
  const { TABLE_NAME } = process.env;

  const listTablesCommand = new ListTablesCommand({});

  await client.send(listTablesCommand)
    .then(async (data) => {
      const exists = !!(data.TableNames?.filter((name) => name === TABLE_NAME).length);
      if (exists) {
        return Promise.resolve();
      }
      const command = new CreateTableCommand({
        TableName: TABLE_NAME,
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      });

      await client.send(command).then(() => logger('success', `Table ${TABLE_NAME} created`));
    })
    .catch((err) => logger('error', `Unable to create table ${err}`));
};
