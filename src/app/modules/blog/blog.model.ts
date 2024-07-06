import { Schema, model } from 'mongoose';
import { BlogType } from './blog.interface';

const blogSchema = new Schema<BlogType>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<BlogType>('Blog', blogSchema);
