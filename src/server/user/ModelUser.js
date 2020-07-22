const User = require("../../model/user");
import jwt from "jsonwebtoken";
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const encodeToken = (data) => {
  const token = jwt.sign(data, secretKey, {
    expiresIn: 60 * 60 * 1000,
  });
  return token;
};

export const userLogin = async (userInfo) => {
  const user = await User.findOne({ email: userInfo.email });
  console.log(user);
  if (!user) {
    return false;
  } else {
    const valid = await user.comparePassword(userInfo.password);
    if (!valid) {
      return false;
    }
    const token = encodeToken({ id: user._id });
    return token;
  }
};

export const userRegister = async (userInfo) => {
  // await User.find({});
  // const user = await User.find({});
  // console.log(user);

  const user = await User.findOne({ email: userInfo.email });
  console.log(user);
  if (!user) {
    const newUser = await User(userInfo);
    await newUser.save();
    const token = encodeToken({ id: newUser._id });
    return token;
  } else {
    return false;
  }
};
