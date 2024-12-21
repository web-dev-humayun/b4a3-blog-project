import { UserRegister } from '../auth/auth.model';
import { BlogPost } from '../blogs/blog.model';

const blockUserByAdminIntoDb = async (userId: string) => {
  const result = await UserRegister.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const deleteBlogByAdminIntoDb = async (id: string) => {
  const result = await BlogPost.findByIdAndDelete(id);
  return result;
};

export const adminService = {
  deleteBlogByAdminIntoDb,
  blockUserByAdminIntoDb,
};
