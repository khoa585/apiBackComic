import express, { response } from "express";

import { responseHelper } from "../../common/responsiveHelper";
import { verifyToken } from "../../common/token";
import { AUTHEN_FAIL } from "../../constant/error";
import { createComment } from "./ModelComment";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { comment, userData, comicId } = req.body;
    if (req.headers.token) {
      const { id } = verifyToken(req.headers.token);
      if (id === userData.userId) {
        const newComment = await createComment(comment, userData, comicId);
        return responseHelper(req, res, null, newComment);
      } else {
        throw new Error(AUTHEN_FAIL);
      }
    } else {
      const newComment = await createComment(comment, userData, comicId);
      return responseHelper(req, res, null, newComment);
    }
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

export default router;
