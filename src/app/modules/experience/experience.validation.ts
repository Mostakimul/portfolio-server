import { z } from 'zod';

const createExperienceValidation = z.object({
  body: z.object({
    timeFrame: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string(),
  }),
});

export const experienceValidations = {
  createExperienceValidation,
};
