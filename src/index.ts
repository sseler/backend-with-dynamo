import express from 'express';
import bodyParser from 'body-parser';
import { EntityController } from './controllers/EntityController';
import { AuthController } from './controllers/AuthController';
import { BasicService } from './services/BasicService';
import { authenticateToken } from './middleware/jwt';
import { DynamoUserMapper } from './infrastracture/DynamoUserMapper';
import { client, initTable } from './infrastracture/aws-client';
import { logger } from './utils/logs';
import { isValidSignupReq, isValidLoginReq, isValidPasswordResetReq } from './middleware/validateReqBody';

const app = express();
app.use(bodyParser.json());
initTable();
const database = new DynamoUserMapper(client);
const basicService = new BasicService(database);
const authController = new AuthController();
const entityController = new EntityController();

// auth
app.post('/signup', authenticateToken, isValidSignupReq,  (req, res) => authController.signup(req, res, basicService));
app.post('/login', authenticateToken, isValidLoginReq, (req, res) => authController.login(req, res, basicService));
app.post('/password-reset/:userId', authenticateToken, isValidPasswordResetReq,  (req, res) => authController.resetPassword(req, res, basicService));

// data-managment

app.get('/user/:userId', authenticateToken, (req, res) => entityController.getUserById(req, res, basicService));
app.get('/user/:userId/:key', authenticateToken, (req, res) => entityController.searchKeyValue(req, res, basicService));
app.delete('/user/:userId', authenticateToken, (req, res) => entityController.delete(req, res, basicService));

app.listen(process.env.PORT, () => {
  logger('info', `Server running on port ${process.env.PORT}`);
});
