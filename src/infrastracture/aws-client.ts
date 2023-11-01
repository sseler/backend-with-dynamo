import AWS = require('aws-sdk');

export const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
  endpoint: process.env.endpoint,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  convertEmptyValues: true
});
