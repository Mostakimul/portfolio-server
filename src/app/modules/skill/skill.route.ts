/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { fileUploader } from '../../shared/sendImageToCloudinary';
import { skillControllers } from './skill.controller';
import { skillsValidations } from './skill.vlidation';

const router = express.Router();

router.post(
  '/',
  auth(),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = skillsValidations.createSkillValidation.parse(
      JSON.parse(req.body.data),
    );
    return skillControllers.createSkill(req, res, next);
  },
);

router.get('/:id', skillControllers.getSingleSkill);

router.patch(
  '/:id',
  auth(),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = skillsValidations.createSkillValidation.parse(
        JSON.parse(req.body.data),
      );
    }
    return skillControllers.updateSkill(req, res, next);
  },
);

router.delete('/:id', auth(), skillControllers.deleteSkill);

router.get('/', skillControllers.getAllSkills);

export const skillRoutes = router;
