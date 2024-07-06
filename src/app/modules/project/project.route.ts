/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../shared/sendImageToCloudinary';
import { projectControllers } from './project.controller';
import { projectsValidations } from './project.vlidation';

const router = express.Router();

router.post(
  '/',
  auth(),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(projectsValidations.createProjectValidation),
  projectControllers.createProject,
);

router.get('/', projectControllers.getAllProject);

export const projectRoutes = router;
