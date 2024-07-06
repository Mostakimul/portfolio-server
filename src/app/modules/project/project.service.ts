/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from 'crypto';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../shared/sendImageToCloudinary';
import { ProjectType } from './project.interface';
import { Project } from './project.model';

const createProjectService = async (file: any, payload: ProjectType) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${payload.title}${randomUUID()}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.imageSrc = secure_url as string;
    }

    const newProject = await Project.create([payload], { session });

    if (!newProject.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create project');
    }

    await session.commitTransaction();
    await session.endSession();

    return newProject[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllProjectService = async () => {
  const result = await Project.find();

  return result;
};

export const projectServices = {
  createProjectService,
  getAllProjectService,
};
