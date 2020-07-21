import express from "express";
import { getComicById, getListComics } from "./ModelComic";
import validator from "express-validation";
import { VALIDATION_GET_LIST_COMIC } from "./ValidationComic";
import { responsHelper } from "../../common/responsiveHelper";

const router = express.Router();
const NUMBER_LIMIT = 10;
router.get("/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;
    const comic = await getComicById(comicId);
    return responsesHelper(req, res, null, { comic });
  } catch (error) {
    return responsesHelper(req, res, error);
  }
});

router.post("/list", validator(VALIDATION_GET_LIST_COMIC), async (req, res) => {
  try {
    const { type, page, numberItem } = req.body;
    const numberLimit = numberItem || NUMBER_LIMIT;
    const { data, total } = await getListComics(type, page, numberLimit);
    return responsesHelper(req, res, null, { data, total });
  } catch (error) {
    return responsesHelper(req, res, error);
  }
});

router.get("/search", async (req, res) => {
  const q = req.query.name;
});
export default router;
