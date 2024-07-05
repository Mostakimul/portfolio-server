import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { experienceController } from './experience.controller';
import { experienceValidations } from './experience.validation';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(experienceValidations.createExperienceValidation),
  experienceController.createExperience,
);

export const experienceRoutes = router;
