import { z } from 'zod';

const createBlogValidation = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

export const blogsValidations = {
  createBlogValidation,
};
