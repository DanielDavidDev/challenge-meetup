import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';
import FileController from './app/controllers/FileController';
import SubscriptionController from './app/controllers/SubscriptionController';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateMeetupStore from './app/validators/MeetupStore';
import validateMeetupUpdate from './app/validators/MeetupUpdate';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);
routes.get('/users', UserController.index);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.get('/meetups/:id', MeetupController.show);
routes.put('/meetups/:id', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/meetups/subscription', SubscriptionController.index);
routes.post('/meetups/:meetupId/subscription', SubscriptionController.store);
routes.delete(
  '/meetups/:meetupId/subscription/:id',
  SubscriptionController.delete
);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
