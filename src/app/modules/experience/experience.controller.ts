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

const getSingleExperience = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await experienceServices.getSingleExperienceService(id);

  sendResponse(res, {
    success: true,
    message: 'Experience fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await experienceServices.updateExperienceService(
    id,
    updatedData,
    req.user,
  );

  sendResponse(res, {
    success: true,
    message: 'Experience updated successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const result = await experienceServices.deleteExperienceService(
    req.params.id,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience deleted successfully',
    data: result,
  });
});

export const experienceController = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
