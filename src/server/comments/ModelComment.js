const Comment = require("../../model/comment");
const User = require("../../model/user");

export const createComment = async (comment, comicId, chapterId, userData) => {
  let newComment;
  if (!userData.id) {
    newComment = new Comment({
      content: comment,
      creator: {
        client: {
          name: userData.name,
          email: userData.email,
          ip: userData.ip,
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
  const comments = await Comment.find({ comic: comicId })
    .populate({
      path: "creator.user",
      select: ["first_name", "last_name", "email", "avatar"],
    })
    .populate({
      path: "replies.creator.user",
      select: ["first_name", "last_name", "email", "avatar"],
    })
    .populate({ path: "chapter", select: "name" });

  return comments;
};

export const getCommentsByChapter = async (chapterId) => {
  const comments = await Comment.find({ chapter: chapterId })
    .populate({
      path: "creator.user",
      select: ["first_name", "last_name", "email", "avatar"],
    })
    .populate({
      path: "replies.creator.user",
      select: ["first_name", "last_name", "email", "avatar"],
    })
    .populate({ path: "chapter", select: "name" });

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
          ip: userData.ip,
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
};
