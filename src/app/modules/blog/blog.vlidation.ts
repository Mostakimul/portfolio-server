import { z } from 'zod';

const createBlogValidation = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  content: z.string({
    required_error: 'Content is required',
  }),
});

export const blogsValidations = {
  createBlogValidation,
};
