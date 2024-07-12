/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { fileUploader } from '../../shared/sendImageToCloudinary';
import { BlogType } from './blog.interface';
import { Blog } from './blog.model';

const createBlogService = async (file: any, payload: BlogType) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
      payload.coverImage = uploadToCloudinary?.secure_url;
    }

    const newBlog = await Blog.create([payload], { session });

    if (!newBlog.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create blog');
    }

    await session.commitTransaction();
    await session.endSession();

    return newBlog[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllBlogsService = async () => {
  const result = await Blog.find();

  return result;
};

const getSingleBlogService = async (payload: string) => {
  const result = await Blog.findById(payload);
  return result;
};

export const blogServices = {
  createBlogService,
  getAllBlogsService,
  getSingleBlogService,
};
