/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserInterface } from './user.interface';
import { User } from './user.model';

const createUserService = async (payload: UserInterface) => {
  // * Check if user already exist
  const isUserExist = await User.isUserExistsByEmail(payload.email);

  // * Show error if user exist
  if (isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User already exist!');
  }

  const result = await User.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user!');
  }

  return result;
};
export const userServices = {
  createUserService,
};
