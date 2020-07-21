import express from "express";
import { getChapterByID } from "./ModelChapter";

const router = express.Router();

router.get("/:chapterId", async (req, res) => {
  const data = await getChapterByID(req.params.chapterId);
  return res.json(data);
});

export default router;
