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

const getSingleSkill = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await skillServices.getSingleSkillService(id);

  sendResponse(res, {
    success: true,
    message: 'Skill fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await skillServices.updateSkillService(
    req.user,
    req.file,
    req.body,
    id,
  );

  sendResponse(res, {
    success: true,
    message: 'Skill updated successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const result = await skillServices.deleteSkillService(
    req.params.id,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully',
    data: result,
  });
});

export const skillControllers = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
