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


export const verifyToken = (token) => {
  try {
    if (!token) {
      return { valid: false, error: "No token provided" };
    }

    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
    
    return {
      valid: true,
      data: decoded
    };
  } catch (err) {
    return {
      valid: false,
      error: "Invalid or expired token"
    };
  }
};