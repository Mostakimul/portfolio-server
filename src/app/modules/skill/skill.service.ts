/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from 'crypto';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../shared/sendImageToCloudinary';
import { SkillType } from './skill.interface';
import { Skill } from './skill.model';

const createSkillService = async (file: any, payload: SkillType) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${payload.skill}${randomUUID()}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.icon = secure_url as string;
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
