import mongoose from 'mongoose';
import { UserRegister } from '../auth/auth.model';
import { currentUserEmail } from '../auth/auth.utils';
import { TBlog } from './blog.interface';
import { BlogPost } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  // console.log(payload);
  const isBlogAlreadyExist = await BlogPost.findOne({ title: payload.title });
  // console.log('isBlogAlreadyExist' , isBlogAlreadyExist)
  if (isBlogAlreadyExist) {
    throw new Error('This Blog Already Exist ! ');
  }
  const result = await BlogPost.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mongoQuery: Record<string, any> = {};

  if (search) {
    const searchRegex = new RegExp(search as string, 'i');
    mongoQuery.$or = [
      { title: { $regex: searchRegex } },
      { content: { $regex: searchRegex } },
    ];
  }

  if (filter) {
    mongoQuery['author'] = filter;
  }

  const sortCriteria: Record<string, 1 | -1> = {
    [sortBy as string]: sortOrder === 'asc' ? 1 : -1,
  };

  const result = await BlogPost.find(mongoQuery).sort(sortCriteria);

  return result;
};

const updateBlogFromDb = async (id: string, payload: Partial<TBlog>) => {
  const result = await BlogPost.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// const deleteBlogFromDb = async (id: string) => {
//   const receivedEmail = currentUserEmail;
//   console.log(receivedEmail);
//   const findUser = await UserRegister.findOne({ email: receivedEmail });

//   // console.log('findUser', findUser);
//   const { _id:findUserId } = findUser;
//   // console.log('user id',_id)

//   const myBlogs = await BlogPost.find({ author: _id });
//   // console.log('my blogs', myBlogs)

//   const matchBlog = myBlogs.forEach((blog)=>blog._id===id)

//   const result = await BlogPost.findByIdAndDelete(id);
//   return result;
// };


const deleteBlogFromDb = async (id: string) => {
  const receivedEmail = currentUserEmail;
  // console.log(receivedEmail);

  const findUser = await UserRegister.findOne({ email: receivedEmail });
  if (!findUser) {
    throw new Error("User not found ! You want to login first !! ");
  }

  const { _id: findUserId } = findUser;

  const myBlogs = await BlogPost.find({ author: findUserId });
  if (!myBlogs || myBlogs.length === 0) {
    throw new Error("No blogs found for this user");
  }

  const matchBlog = myBlogs.find((blog) => blog._id.equals(new mongoose.Types.ObjectId(id)));

  // console.log(matchBlog)
  if (!matchBlog) {
    throw new Error("This Blog Blog does not belong for you ! ");
  }

  const result = await BlogPost.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDb,
  deleteBlogFromDb,
};
