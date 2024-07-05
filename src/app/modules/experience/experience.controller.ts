import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { experienceServices } from './experience.service';

const createExperience = catchAsync(async (req, res) => {
  const result = await experienceServices.createExperienceService(
    req.body,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience created successfully',
    data: result,
  });
});

const getAllExperience = catchAsync(async (req, res) => {
  const result = await experienceServices.getAllExperienceService();

  sendResponse(res, {
    success: true,
    message: 'Experiences fetched successfully!',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const experienceController = {
  createExperience,
  getAllExperience,
};
