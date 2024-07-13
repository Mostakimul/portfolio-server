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

const getAllExperienceService = async () => {
  const result = await Experience.find();

  return result;
};

const getSingleExperienceService = async (id: string) => {
  const result = await Experience.findById(id);
  return result;
};

const updateExperienceService = async (
  id: string,
  payload: Partial<ExperienceType>,
  user: JwtPayload,
) => {
  const isProductExist = await Experience.findOne({ _id: id });
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found');
  }

  const existingUser = await User.findOne({
    email: user?.email,
  });
  if (!existingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not allowed!');
  }

  const result = await Experience.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteExperienceService = async (id: string, user: JwtPayload) => {
  const isExist = await Experience.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found!');
  }

  const existingUser = await User.findOne({
    email: user?.email,
  });
  if (!existingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not allowed!');
  }
  const result = await Experience.deleteOne({ _id: id });

  return result;
};

export const experienceServices = {
  createExperienceService,
  getAllExperienceService,
  getSingleExperienceService,
  updateExperienceService,
  deleteExperienceService,
};
