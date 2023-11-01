# Fireart task

## Development pre requirements
cp .env.default .env

Edit .env file with data you want to develop with

For safety reasons I did't provide AWS data.

## Install 
```
git git@github.com:sseler/backend-with-dynamo.git
npm install
npm run debug or any other script from 'Available scripts'
`Table process.env.TABLE_NAME (default: 'users') created` - table was created in your AWS DynamoDB.
`Server running on port 4000` - everything's fine
```


### Available scripts

| Npm Script    | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| `build`       | Full build                                                                                  |
| `debug`       | Run development                                                                             |
| `server`      | Run code                                                                                    |
| `lint`        | Checks and shows errors and warnings                                                        |
| `lint:errors` | Checks and shows only errors                                                                |
| `fix`         | Fixes bugs found by linter                                                                  |
| `format`      | Formats the code                                                                            |

### Endpoints 
 All present in postman file
| Method        | Route                                    | Request body                                                    |
| ------------- | -----------------------------------------|-----------------------------------------------------------------|
| `POST`        | /signup                                  | {"username": `string`, "password": `string`, "email": `string`} |
| `POST`        | /login                                   | {"username": `string`, "password": `string`}                    |
| `GET`         | /user/:userId                            |            empty                                                |
| `GET`         | /user/:userId/:key                       |            empty                                                |
| `POST`        | /password-reset/:userId                  | {"oldPassword": `string`, "newPassword": `string`}              |
| `DELETE`      | /user/:userId                            |            empty                                                |


