/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/sendImageToCloudinary';
import { User } from '../user/user.model';
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

const updateProjectService = async (
  user: JwtPayload,
  file: any,
  payload: Partial<ProjectType>,
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
    payload.imageSrc = uploadToCloudinary?.secure_url;
  }

  const result = await Project.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteProjectService = async (id: string, user: JwtPayload) => {
  const isExist = await Project.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found!');
  }

  const existingUser = await User.findOne({
    email: user?.email,
  });
  if (!existingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not allowed!');
  }
  const result = await Project.deleteOne({ _id: id });

  return result;
};

export const projectServices = {
  createProjectService,
  getAllProjectService,
  getSingleProjectService,
  updateProjectService,
  deleteProjectService,
};
