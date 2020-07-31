import express from "express";
import { getComicById, getListComics, searchListComics ,getListTop} from "./ModelComic";
import validator from "express-validation";
import {
  VALIDATION_GET_LIST_COMIC,
  VALIDATION_SEARCH_COMIC,
  VALIDATION_LIST_TOP
} from "./ValidationComic";
import { responseHelper } from "../../common/responsiveHelper";

const router = express.Router();
const NUMBER_LIMIT = 10;
router.get("/detail/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;
    const comic = await getComicById(comicId);
    return responseHelper(req, res, null, comic);
  } catch (error) {
    return responseHelper(req, res, error);
  }
});

router.post("/list", validator(VALIDATION_GET_LIST_COMIC), async (req, res) => {
  try {
    const { type, page, numberitem } = req.body;
    const numberLimit = numberitem || NUMBER_LIMIT;
    const { data, total } = await getListComics(type, page, numberLimit);
    return responseHelper(req, res, null, data, total);
  } catch (error) {
    console.log(error);
    return responseHelper(req, res, error);
  }
});

router.post("/search", validator(VALIDATION_SEARCH_COMIC), async (req, res) => {
  try {
    /**
     * @DES Search with name or authors
     */
    const { name, authors, page, numberitem } = req.body;
    const numberLimit = numberitem || NUMBER_LIMIT;
    const { comics, total } = await searchListComics(
      name,
      authors,
      page,
      numberLimit
    );
    return responseHelper(req, res, null, comics, total);

    /**
     * @DES Search with query string with 2 fields name and authors
     */

    // const { query, page, numberitem } = req.body;
    // const numberLimit = numberitem || NUMBER_LIMIT;

    // const { comics, total } = await searchListComics(query, page, numberLimit);
    // return responseHelper(req, res, null, comics, total);
  } catch (error) {
    return responseHelper(req, res, error);
  }
});
router.post("/list-top",
  validator(VALIDATION_LIST_TOP),
  async (req,res)=>{
    try {
         let listTop = await getListTop(req.body.type);
         return responseHelper(req, res, null, listTop);
    } catch (error) {
      return responseHelper(req, res, error);
    }
  })

export default router;
