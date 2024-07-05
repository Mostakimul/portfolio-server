import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
    }),
    currentRole: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password cannot be more than 20 characters!' })
      .optional(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
