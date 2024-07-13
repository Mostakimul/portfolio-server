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

router.get('/:id', experienceController.getSingleExperience);

router.put(
  '/:id',
  auth(),
  validateRequest(experienceValidations.updateExperienceValidation),
  experienceController.updateExperience,
);

router.delete('/:id', auth(), experienceController.deleteExperience);

router.get('/', experienceController.getAllExperience);

export const experienceRoutes = router;
