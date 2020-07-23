const User = require("../../model/user");
import { encodeToken } from "../../common/jwtHelper";
import {
  USER_NOT_MATCHED,
  EMAIL_TAKEN,
  PASSWORD_NOT_MATCHED,
} from "../../constant/error";

export const userLogin = async (userData) => {
  const user = await User.findOne({ email: userData.email }).select(
    "-comics_following"
  );
  if (!user) {
    throw new Error(USER_NOT_MATCHED);
  } else {
    const valid = await user.comparePassword(userData.password);
    if (!valid) {
      throw new Error(PASSWORD_NOT_MATCHED);
    }
    let userInfo = user.toObject();
    delete userInfo.password;
    let token = encodeToken(userInfo);
    userInfo.token = token;
    delete userInfo._id;
    return userInfo;
  }
};

export const userRegister = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    const newUser = await User(userData);
    await newUser.save();
  } else {
    throw new Error(EMAIL_TAKEN);
  }
};

export const getUserInfoById = async (idUser) => {
  return await User.findById(idUser);
};

export const uploadAvatar = async (userId, path) => {
  const user = await User.findById(userId);
  user.avatar = path;
  await user.save();
};
