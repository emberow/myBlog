import * as jwt from 'jsonwebtoken';
import { CustomError } from 'src/middleware/errors';

export const signJwt = async (userName) => {
  const privateKey = process.env.JWT_PRIVATE_SECRET;
  return jwt.sign(userName, privateKey, { expiresIn: '1 days' });
}

export const verifyAccount = async (token: string) => {
  let result: jwt.JwtPayload;
  const privateKey = process.env.JWT_PRIVATE_SECRET;
  try {
    result = jwt.verify(token, privateKey) as jwt.JwtPayload;
  } catch (err) {
    if (err.message === 'jwt expired') {
      throw new CustomError(403, 'EXPIRED_TOKEN');
    } else {
      throw new CustomError(401, 'INVALID_JWT_TOKEN');
    }
  }
  return result as any;
}
