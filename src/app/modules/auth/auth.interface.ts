import { USER_ROLE } from './auth.constant';

export type TLoginUser = {
  email: string;
  password: string;
};
export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked?: boolean;
};



export type TUserRole = keyof typeof USER_ROLE;
