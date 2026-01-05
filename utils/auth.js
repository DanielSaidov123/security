import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "change-this-secret";
const jwtExpire = process.env.JWT_EXPIRE || "1h";

export function signJwt(user) {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    jwtSecret,
    { expiresIn: jwtExpire }
  );
}

export function verifyJwt(token) {
  return jwt.verify(token, jwtSecret);
}