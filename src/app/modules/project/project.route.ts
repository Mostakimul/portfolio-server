/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { fileUploader } from '../../shared/sendImageToCloudinary';
import { projectControllers } from './project.controller';
import { projectsValidations } from './project.vlidation';

const router = express.Router();

router.post(
  '/',
  auth(),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = projectsValidations.createProjectValidation.parse(
      JSON.parse(req.body.data),
    );
    return projectControllers.createProject(req, res, next);
  },
);

router.get('/', projectControllers.getAllProject);
router.get('/:id', projectControllers.getSingleProject);

export const projectRoutes = router;
