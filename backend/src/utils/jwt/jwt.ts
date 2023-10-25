import * as jwt from 'jsonwebtoken';

export const signJwt = async (userName) => {
  const privateKey = process.env.JWT_PRIVATE_SECRET;
  return jwt.sign(userName, privateKey, { expiresIn: '1 days' });
}

export const verifyAccount = async (token: string) => {
  const privateKey = process.env.JWT_PRIVATE_SECRET;
  return jwt.verify(token, privateKey) as any;
}
