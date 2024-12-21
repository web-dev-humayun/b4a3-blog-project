import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { currentUserEmail } from '../auth/auth.utils';
import { UserRegister } from '../auth/auth.model';

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  const receivedEmail = currentUserEmail;

  const findUser = await UserRegister.findOne({ email: receivedEmail });
  // console.log(receivedEmail);

  // Check if user is found
  if (!findUser) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'User not found',
      data: null,
    });
  }

  // If user found, extract the name and email
  const { _id} = findUser;
  // console.log(_id)

  const author = _id;

  const blogData = {
    title,
    content,
    author,
  };

  const result = await BlogServices.createBlogIntoDB(blogData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Blogs are find successfully',
    data: result,
  });
});

// for update Blog data
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogFromDb(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

// for delete Blog data
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  await BlogServices.deleteBlogFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog delete successfully',
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
