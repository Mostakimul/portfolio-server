import { Schema, model } from 'mongoose';
import { ExperienceType } from './experience.interface';

const experienceSchema = new Schema<ExperienceType>(
  {
    timeFrame: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Experience = model<ExperienceType>('Experience', experienceSchema);
