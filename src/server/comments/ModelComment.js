import { USER_NOT_FOUND } from "../../constant/error";

const Comment = require("../../model/comment");
const User = require("../../model/user");
import mongoose from "mongoose";

export const createComment = async (comment, userData, comicId) => {
  let newComment;

  if (userData.id) {
    const user = await User.findById(userData.id);
    if (!user) {
      throw new Error();
    }
    newComment = new Comment({
      content: comment,
      creator: {
        user: userData.id,
      },
      comic_id: comicId,
    });

    const sess = mongoose.startSession();
    sess.startTransaction();
    await newComment.save({ session: sess });
    user.comments.push(newComment);
    await user.save({ session: sess });
    await 
    sess.commit();
  } else {
    newComment = new Comment({
      content: comment,
      creator: {
        client: {
          email: userData.email,
          name: userData.name,
        },
      },
      comic_id: comicId,
    });
    await newComment.save();
  }

  return newComment;
};
