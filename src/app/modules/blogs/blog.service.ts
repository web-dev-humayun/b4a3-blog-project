import mongoose from 'mongoose';
import { UserRegister } from '../auth/auth.model';
import { currentUserEmail } from '../auth/auth.utils';
import { TBlog } from './blog.interface';
import { BlogPost } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createBlogIntoDB = async (payload: TBlog) => {

  // console.log(payload);
  const isBlogAlreadyExist = await BlogPost.findOne({ title: payload.title });
  // console.log('isBlogAlreadyExist' , isBlogAlreadyExist)
  if (isBlogAlreadyExist) {
    throw new Error('This Blog Already Exist ! ');
  }
  const result = (await BlogPost.create(payload)).populate('author');
  return result;
};


const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  // use QueryBuilder to construct the query
  const queryBuilder = new QueryBuilder(BlogPost.find().populate('author'), query)
    .addSearch(['title','content'])
    .addSorting()
    .addFilter();

  // execute the query
  const blogs = await queryBuilder.queryModel;
  // console.log(blogs)
  return blogs;
};

const updateBlogFromDb = async (id: string, payload: Partial<TBlog>) => {
  const receivedEmail = currentUserEmail;

  const findUser = await UserRegister.findOne({ email: receivedEmail });
  if(findUser?.role==='admin'){
    throw new Error('Admin Cannot Update Any Blog !')
  }
  const result = await BlogPost.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDb = async (id: string) => {
  const receivedEmail = currentUserEmail;

  const findUser = await UserRegister.findOne({ email: receivedEmail });
  if (!findUser) {
    throw new Error('You want to login first !! ');
  }

  const { _id: findUserId } = findUser;

  const myBlogs = await BlogPost.find({ author: findUserId });
  if (!myBlogs || myBlogs.length === 0) {
    throw new Error('No blogs found for this user');
  }

  const matchBlog = myBlogs.find((blog) =>
    blog._id.equals(new mongoose.Types.ObjectId(id)),
  );

  // console.log(matchBlog)
  if (!matchBlog) {
    throw new Error('This Blog Blog does not belong for you ! ');
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
