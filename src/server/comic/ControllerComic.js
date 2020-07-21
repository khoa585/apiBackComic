import express from "express";
import { getComicById, getListComics } from "./ModelComic";
import validator from "express-validation";
import { VALIDATION_GET_LIST_COMIC } from "./ValidationComic";

const router = express.Router();
const NUMBER_LIMIT = 10;
router.get("/:comicId", async (req, res) => {
  const { comicId } = req.params;
  const comic = await getComicById(comicId);
  return res.status(200).json({
    message: "success",
    data: comic,
  });
});
router.post("/list", validator(VALIDATION_GET_LIST_COMIC), async (req, res) => {
  const { type, page, numberItem } = req.body;
  const numberLimit = numberItem || NUMBER_LIMIT;
  const comics = await getListComics(type, page, numberLimit);
  return res.status(200).json({
    message: "success",
    count: comics.length,
    data: comics,
  });
});
export default router;
