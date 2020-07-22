const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

export const verifyToken = (token) => {
  const result = jwt.verify(token, secretKey);
  return result;
};



export const encodeToken = (data) => {
  const token = jwt.sign(data, secretKey, {
    expiresIn: 60 * 60 * 1000,
  });
  return token;
};
