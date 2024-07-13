import { z } from 'zod';

const badgeSchema = z.object({
  title: z.string({
    required_error: 'Badge title is required',
  }),
  link: z.string({
    required_error: 'Link is required',
  }),
});

const createProjectValidation = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  badges: z.array(badgeSchema),
});

const updateProjectValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  badges: z.array(badgeSchema).optional(),
});

export const projectsValidations = {
  createProjectValidation,
  updateProjectValidation,
};
