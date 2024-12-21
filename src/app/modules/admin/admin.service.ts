import { UserRegister } from '../auth/auth.model';
import { currentUserEmail } from '../auth/auth.utils';
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
  const receivedEmail = currentUserEmail;
  const findUser = await UserRegister.findOne({ email: receivedEmail });
  // console.log(findUser)
  if(findUser?.role!=='admin'){
    throw new Error('You are not an admin !')
  }
  const result = await BlogPost.findByIdAndDelete(id);
  return result;
};

export const adminService = {
  deleteBlogByAdminIntoDb,
  blockUserByAdminIntoDb,
};
