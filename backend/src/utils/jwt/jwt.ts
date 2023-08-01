import * as jwt from 'jsonwebtoken';

export const signJwt = async (values) => {
  var privateKey = process.env.JWT_PRIVATE_SECRET;
  return jwt.sign(values, privateKey, { expiresIn: '1 days' });
}
