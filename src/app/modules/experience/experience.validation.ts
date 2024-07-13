import { z } from 'zod';

const createExperienceValidation = z.object({
  body: z.object({
    timeFrame: z.string({
      required_error: 'Time frame is required!',
    }),
    role: z.string({
      required_error: 'Role is required!',
    }),
    company: z.string({
      required_error: 'Company name is required!',
    }),
    location: z.string({
      required_error: 'Location is required!',
    }),
  }),
});

const updateExperienceValidation = z.object({
  body: z.object({
    timeFrame: z.string().optional(),
    role: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const experienceValidations = {
  createExperienceValidation,
  updateExperienceValidation,
};
