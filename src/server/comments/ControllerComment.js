import express, { response } from "express";

import { responseHelper } from "../../common/responsiveHelper";

import {
  createComment,
  getCommentsByComic,
  getCommentsByCreator,
  createReply,
} from "./ModelComment";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    if (!req.user) {
      const { userData, comment, comicId, chapterId } = req.body;
      const newComment = await createComment(
        comment,
        comicId,
        chapterId,
        userData
      );
      return responseHelper(req, res, null, newComment);
    } else {
      const { comment, comicId, chapterId } = req.body;
      const userId = req.user._id;
      const newComment = await createComment(comment, comicId, chapterId, {
        id: userId,
      });
      return responseHelper(req, res, null, newComment);
    }
  } catch (error) {
    console.log(error);
    return responseHelper(req, res, error);
  }
});

//GET COMMENTS BY COMIC_ID
router.post("/comic", async (req, res) => {
  try {
    const { comicId } = req.body;
    const comments = await getCommentsByComic(comicId);
    return responseHelper(req, res, null, comments);
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

//GET COMMENTS BY CREATOR_ID
router.post("/creator", async (req, res) => {
  try {
    const { creatorId } = req.body;
    const comments = await getCommentsByComic(creatorId);
    return responseHelper(req, res, null, comments);
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

//REPLY 
router.post("/reply/create", async (req, res) => {
  try {
    if (!req.user) {
      const { replyText, commentId, userData } = req.body;
      const commentUpdated = await createReply(replyText, commentId, userData);
      return responseHelper(req, res, null, commentUpdated);
    } else {
      const { replyText, commentId } = req.body;
      const commentUpdated = await createReply(replyText, commentId, {
        id: req.user._id,
      });
      return responseHelper(req, res, null, commentUpdated);
    }
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

export default router;
