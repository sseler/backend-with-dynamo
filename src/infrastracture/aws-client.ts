import AWS = require('aws-sdk');

const configuration = {
  region: process.env.region,
  endpoint: process.env.endpoint,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

export const docClient = new AWS.DynamoDB.DocumentClient({
  ...configuration,
  convertEmptyValues: true
});

export const initTable = async () => {
  const TABLE_NAME = 'users';
  const client = new AWS.DynamoDB(configuration);
  await client.listTables({}).promise().then((data) => {

    const exists = !!(data.TableNames?.filter((name) => name === TABLE_NAME).length);
    if (exists) {
      return Promise.resolve();
    }
    const params = {
      TableName: TABLE_NAME,
      AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' }
      ],
      KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' },
        { AttributeName: 'sk', KeyType: 'RANGE' },
      ],
      BillingMode: 'PAY_PER_REQUEST'
    };
    client.createTable(params).promise().then(() => {
      console.log(`Created table ${TABLE_NAME}`);
    }).catch((err) => console.log(err, 'Unable to create table'));

  });
};
