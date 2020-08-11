import express from "express";
import validator from "express-validation";
import { COMMENT_VALIDATION, REPLY_VALIDATION } from "./ValidatorComment";
import { responseHelper } from "../../common/responsiveHelper";
import {createComment,getCommentsByComic,getCommentsByChapter,createReply,} from "./ModelComment";

const router = express.Router();

//Tao comment
router.post("/create", validator(COMMENT_VALIDATION), async (req, res) => {
  try {
    if (!req.user) {
      const { userData, comment, comicId, chapterId } = req.body;
      const newComment = await createComment(comment, comicId, chapterId, {
        ...userData,
        ip: req.ip,
      });
      
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
router.post("/chapter", async (req, res) => {
  try {
    const { chapterId } = req.body;
    const comments = await getCommentsByChapter(chapterId);
    return responseHelper(req, res, null, comments);
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

//REPLY
router.post("/reply/create", validator(REPLY_VALIDATION), async (req, res) => {
  try {
    if (!req.user) {
      const { replyText, commentId, userData } = req.body;
      userData.ip = req.ip;
      await createReply(replyText, commentId, userData);
      return responseHelper(req, res, null);
    } else {
      const { replyText, commentId } = req.body;
      await createReply(replyText, commentId, {
        id: req.user._id,
      });
      return responseHelper(req, res, null);
    }
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

export default router;
