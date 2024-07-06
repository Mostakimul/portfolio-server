import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogService(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is created successfully!',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsService();

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully!',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlogs,
};
