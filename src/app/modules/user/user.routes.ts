import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUser,
);

export const userRoutes = router;
