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

const getSingleBlog = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await blogServices.getSingleBlogService(id);

  sendResponse(res, {
    success: true,
    message: 'Blog fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await blogServices.updateBlogService(req.file, req.body, id);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await blogServices.deleteBlogService(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
