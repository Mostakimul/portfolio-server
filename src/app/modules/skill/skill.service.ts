/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/sendImageToCloudinary';
import { User } from '../user/user.model';
import { SkillType } from './skill.interface';
import { Skill } from './skill.model';

const createSkillService = async (file: any, payload: SkillType) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
      payload.icon = uploadToCloudinary?.secure_url;
    }

    const newSkill = await Skill.create([payload], { session });

    if (!newSkill.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create skill');
    }

    await session.commitTransaction();
    await session.endSession();

    return newSkill[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllSkillsService = async () => {
  const result = await Skill.find();

  return result;
};

const getSingleSkillService = async (id: string) => {
  const result = await Skill.findById(id);
  return result;
};

const updateSkillService = async (
  user: JwtPayload,
  file: any,
  payload: Partial<SkillType>,
  id: string,
) => {
  const existingUser = await User.findOne({
    email: user?.email,
  });
  if (!existingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not allowed!');
  }

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    payload.icon = uploadToCloudinary?.secure_url;
  }

  const result = await Skill.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteSkillService = async (id: string, user: JwtPayload) => {
  const isExist = await Skill.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found!');
  }

  const existingUser = await User.findOne({
    email: user?.email,
  });
  if (!existingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not allowed!');
  }
  const result = await Skill.deleteOne({ _id: id });

  return result;
};

export const skillServices = {
  createSkillService,
  getAllSkillsService,
  getSingleSkillService,
  updateSkillService,
  deleteSkillService,
};
