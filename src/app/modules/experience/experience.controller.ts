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

export const experienceController = {
  createExperience,
};
