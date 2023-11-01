import express from 'express';
import bodyParser from 'body-parser';
import { BasicController } from './controllers/BasicController';
import { BasicService } from './services/BasicService';
import { authenticateToken } from './middleware/jwt';
import { DbUserMapper } from './infrastracture/DbMapper';
import { docClient, initTable } from './infrastracture/aws-client';

const app = express();
app.use(bodyParser.json());
initTable();
const database = new DbUserMapper(docClient);
const basicService = new BasicService(database);
const controller = new BasicController();

app.post('/signup', authenticateToken, (req, res) => controller.signup(req, res, basicService));
app.get('/user/:userId', authenticateToken, (req, res) => controller.getUserById(req, res, basicService));
app.post('/login', authenticateToken, (req, res) => controller.login(req, res, basicService));
app.get('/user/:userId/:key', authenticateToken, (req, res) => controller.searchKeyValue(req, res, basicService));

// app.post('/password-reset', authenticateToken, controller.resetPassword);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
