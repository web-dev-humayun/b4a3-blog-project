import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export let currentUserEmail: string | null = null;

export const loginUserEmail = (email: string) => {
  currentUserEmail = email;
};
