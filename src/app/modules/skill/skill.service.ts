/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/sendImageToCloudinary';
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

export const skillServices = {
  createSkillService,
  getAllSkillsService,
};
