/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../shared/sendImageToCloudinary';
import { skillControllers } from './skill.controller';
import { skillsValidations } from './skill.vlidation';

const router = express.Router();

router.post(
  '/',
  auth(),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.body);
    next();
  },
  validateRequest(skillsValidations.createSkillValidation),
  skillControllers.createSkill,
);

router.get('/', skillControllers.getAllSkills);

export const skillRoutes = router;
