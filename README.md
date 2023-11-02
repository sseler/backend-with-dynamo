# Fireart task

## Development pre requirements
```
git clone git@github.com:adtonos/adtonos-twilight.git
```

cp .env.default .env

Edit .env file with AWS configuration you want to develop with

For safety reasons I did't provide AWS data.

## Install locally
```
git git@github.com:sseler/backend-with-dynamo.git
npm install
npm run debug or any other script from 'Available scripts'
`Table process.env.TABLE_NAME (default: 'users') created` - table was created in your AWS DynamoDB.
`Server running on port process.env.PORT (default: 4000)` - everything's fine
```

### Available scripts

| Npm Script    | Description                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------|
| `build`       | Full build                                                                                  |
| `debug`       | Run development                                                                             |
| `server`      | Run code                                                                                    |
| `lint`        | Checks and shows errors and warnings                                                        |
| `lint:errors` | Checks and shows only errors                                                                |
| `fix`         | Fixes bugs found by linter                                                                  |
| `format`      | Formats the code                                                                            |

## Run in docker

**Steps**:
1. Change environment variables to AWS configuration you want to develop with

2. Run ```docker-compose up --build```

3. In docker-compose.yml environment section there is a property `DEV`

DEV=1 => ```npm run debug```

DEV=0 => ```npm run server```

```
docker-compose build
docker-compose up (-d for detached mode)*
docker-compose up 
* docker-compose logs -f fire-art-backend to show logs was runned in detached mode
```

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


