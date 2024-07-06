import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { skillServices } from './skill.service';

const createSkill = catchAsync(async (req, res) => {
  const result = await skillServices.createSkillService(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill is created successfully!',
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const result = await skillServices.getAllSkillsService();

  sendResponse(res, {
    success: true,
    message: 'Skills fetched successfully!',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const skillControllers = {
  createSkill,
  getAllSkills,
};
