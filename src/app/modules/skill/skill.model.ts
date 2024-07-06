import { Schema, model } from 'mongoose';
import { SkillType } from './skill.interface';

const skillSchema = new Schema<SkillType>(
  {
    skill: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Skill = model<SkillType>('Skill', skillSchema);
