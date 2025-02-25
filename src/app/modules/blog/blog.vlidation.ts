import { z } from 'zod';

const createBlogValidation = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  content: z.string({
    required_error: 'Content is required',
  }),
});

const updateBlogValidation = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .optional(),
  content: z
    .string({
      required_error: 'Content is required',
    })
    .optional(),
});

export const blogsValidations = {
  createBlogValidation,
  updateBlogValidation,
};
