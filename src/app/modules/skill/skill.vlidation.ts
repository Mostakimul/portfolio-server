import { z } from 'zod';

const createSkillValidation = z.object({
  skill: z.string({
    required_error: 'Skill is required',
  }),
});

export const skillsValidations = {
  createSkillValidation,
};
