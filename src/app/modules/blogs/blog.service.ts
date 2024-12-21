import { TBlog } from './blog.interface';
import { BlogPost } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  console.log(payload);
  const isBlogAlreadyExist =await BlogPost.findOne({ title: payload.title });
  // console.log('isBlogAlreadyExist' , isBlogAlreadyExist)
  if(isBlogAlreadyExist){
    throw new Error('This Blog Already Exist ! ')
  }
  const result = await BlogPost.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = query;

  const mongoQuery: Record<string, any> = {};

  if (search) {
    const searchRegex = new RegExp(search as string, 'i');
    mongoQuery.$or = [
      { title: { $regex: searchRegex } },
      { content: { $regex: searchRegex } },
    ];
  }

  if (filter) {
    mongoQuery['author.author_id'] = filter;
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

const deleteBlogFromDb = async (id: string) => {
  console.log(id);
  const result = await BlogPost.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDb,
  deleteBlogFromDb,
};
