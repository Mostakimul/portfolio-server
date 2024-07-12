/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/sendImageToCloudinary';
import { ProjectType } from './project.interface';
import { Project } from './project.model';

const createProjectService = async (file: any, payload: ProjectType) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
      payload.imageSrc = uploadToCloudinary?.secure_url as string;
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

const getSingleProjectService = async (payload: string) => {
  const result = await Project.findById(payload);
  return result;
};

export const projectServices = {
  createProjectService,
  getAllProjectService,
  getSingleProjectService,
};
