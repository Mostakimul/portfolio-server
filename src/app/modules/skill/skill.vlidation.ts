import { z } from 'zod';

const createSkillValidation = z.object({
  body: z.object({
    skill: z.string(),
  }),
});

export const skillsValidations = {
  createSkillValidation,
};
