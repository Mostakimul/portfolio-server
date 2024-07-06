import { Schema, model } from 'mongoose';
import { BadgeType, ProjectType } from './project.interface';

const badgeSchema = new Schema<BadgeType>({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const projectSchema = new Schema<ProjectType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    badges: {
      type: [badgeSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = model<ProjectType>('Project', projectSchema);
