const User = require("../../model/user");
import { encodeToken } from "../../common/token";
import { USER_NOT_MATCHED, EMAIL_TAKEN } from "../../constant/error";

export const userLogin = async (userData) => {
  // await User.remove({});
  // const user = await User.find({})
  // console.log(user);

  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error(USER_NOT_MATCHED);
  } else {
    const valid = await user.comparePassword(userData.password);
    if (!valid) {
      throw new Error(USER_NOT_MATCHED);
    }
    const token = encodeToken({ id: user._id, role: user.role });
    const userInfo = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      comments: user.comments,
      comics_following: user.comics_following,
      comics_uploaded: user.comics_uploaded,
      id: user._id,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { token, userInfo };
  }
};

export const userRegister = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    const newUser = await User(userData);
    await newUser.save();
    const token = encodeToken({ id: newUser._id, role: newUser.role });
    const userInfo = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      comments: newUser.comments,
      comics_following: newUser.comics_following,
      comics_uploaded: newUser.comics_uploaded,
      id: newUser._id,
      role: newUser.role,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return { token, userInfo };
  } else {
    throw new Error(EMAIL_TAKEN);
  }
};
