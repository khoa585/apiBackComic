import jwt from "jsonwebtoken";
import { ERROR_AUTHEN } from "../constant/error";
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

export const verifyToken = (token) => {
  const result = jwt.verify(token, secretKey);
  if (!result) throw new Error(ERROR_AUTHEN);
  return result;
};

export const encodeToken = (data) => {
  const token = jwt.sign(data, secretKey, {
    expiresIn: 60 * 60 * 1000,
  });

  return token;
};
