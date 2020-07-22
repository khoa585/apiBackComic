import express from "express";
import { getChapterByID } from "./ModelChapter";
import { responseHelper } from "../../common/responsiveHelper";

const router = express.Router();

router.get("/detail/:chapterId", async (req, res) => {
  try {
    const { chapter, listChapters } = await getChapterByID(
      req.params.chapterId
    );
    return responseHelper(req, res, null, { chapter, listChapters });
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

export default router;
