import { z } from 'zod';

const badgeSchema = z.object({
  title: z.string(),
  link: z.string(),
});

const createProjectValidation = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    badges: z.array(badgeSchema),
  }),
});

export const projectsValidations = {
  createProjectValidation,
};
