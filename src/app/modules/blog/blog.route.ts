/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { fileUploader } from '../../shared/sendImageToCloudinary';
import { blogControllers } from './blog.controller';
import { blogsValidations } from './blog.vlidation';

const router = express.Router();

router.post(
  '/',
  auth(),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = blogsValidations.createBlogValidation.parse(
      JSON.parse(req.body.data),
    );
    return blogControllers.createBlog(req, res, next);
  },
);

router.get('/', blogControllers.getAllBlogs);
router.get('/:id', blogControllers.getSingleBlog);

export const blogRoutes = router;
