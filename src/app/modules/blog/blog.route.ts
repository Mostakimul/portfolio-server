/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../shared/sendImageToCloudinary';
import { blogControllers } from './blog.controller';
import { blogsValidations } from './blog.vlidation';

const router = express.Router();

router.post(
  '/',
  auth(),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(blogsValidations.createBlogValidation),
  blogControllers.createBlog,
);

router.get('/', blogControllers.getAllBlogs);

export const blogRoutes = router;
