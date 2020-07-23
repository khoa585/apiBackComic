import { USER_NOT_FOUND } from "../../constant/error";

const Comment = require("../../model/comment");
const User = require("../../model/user");
import mongoose from "mongoose";

export const createComment = async (comment, comicId, chapterId, userData) => {
  let newComment;
  console.log(userData);
  if (!userData.id) {
    newComment = new Comment({
      content: comment,
      creator: {
        client: {
          name: userData.name,
          email: userData.email,
        },
      },
      comic: comicId,
      chapter: chapterId,
    });
  } else {
    newComment = new Comment({
      content: comment,
      creator: {
        user: userData.id,
      },
      comic: comicId,
      chapter: chapterId,
    });
  }
  await newComment.save();
  return newComment;
};

export const getCommentsByComic = async (comicId) => {
  console.log(comicId);
  const comments = await Comment.find({ comic_id: comicId });
  console.log(comments);
  return comments;
};

export const getCommentsByCreator = async (creatorId) => {
  const comments = await Comment.find({ creator: { user: creatorId } });
  return comments;
};

export const createReply = async (replyText, commentId, userData) => {
  const comment = await Comment.findById(commentId);
  let newReply;
  if (!userData.id) {
    newReply = {
      content: replyText,
      creator: {
        client: {
          name: userData.name,
          email: userData.email,
        },
      },
    };
  } else {
    newReply = {
      content: replyText,
      creator: {
        user: userData.id,
      },
    };
  }
  comment.replies.push(newReply);
  await comment.save();
  return comment;
};
