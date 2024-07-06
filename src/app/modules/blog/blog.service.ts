/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from 'crypto';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../shared/sendImageToCloudinary';
import { BlogType } from './blog.interface';
import { Blog } from './blog.model';

const createBlogService = async (file: any, payload: BlogType) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${payload.author}${randomUUID()}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.coverImage = secure_url as string;
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

export const BlogServices = {
  createBlogService,
};
