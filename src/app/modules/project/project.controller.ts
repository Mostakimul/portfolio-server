import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { projectServices } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const result = await projectServices.createProjectService(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project is created successfully!',
    data: result,
  });
});

const getAllProject = catchAsync(async (req, res) => {
  const result = await projectServices.getAllProjectService();

  sendResponse(res, {
    success: true,
    message: 'Projects fetched successfully!',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const projectControllers = {
  createProject,
  getAllProject,
};
