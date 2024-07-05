import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ExperienceType } from './experience.interface';
import { Experience } from './experience.model';

const createExperienceService = async (
  payload: ExperienceType,
  user: JwtPayload,
) => {
  const existingUser = await User.findOne({
    email: user?.email,
  });
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const result = await Experience.create(payload);

  return result;
};

export const experienceServices = {
  createExperienceService,
};
