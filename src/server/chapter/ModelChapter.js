import request from "request-promise";
import cheerio from "cheerio";

const Chapter = require("../../model/chapter");
const ComicDb = require("../../model/comic");
import { getData, putData } from "../../common/cache";

const getImageLinks = async (uri) => {
  try {
    const response = await request.get(uri);
    const $ = await cheerio.load(response);
    let imageLinks = [];

    $(".page-chapter img").each(function (i, elem) {
      imageLinks[i] = $(this).attr("src");
    });

    return imageLinks;
  } catch (error) {
    console.log(error);
  }
};

export const getChapterByID = async (chapterId) => {
  const chapter = await Chapter.findById(chapterId).populate(
    "comic_id",
    "name"
  );
  if (chapter.images.length === 0) {
    const images = await getImageLinks(chapter.url);
    chapter.images = [...images];
  }
  chapter.views++;
  await chapter.save();
  const key = chapter.comic_id;
  const valueCache = getData(key);
  if (valueCache) {
    return { chapter, listChapters: valueCache };
  }
  const comic = await ComicDb.findById(chapter.comic_id).populate("chapters", "name");
  const listChapters = [...comic.chapters];

  putData(key, listChapters);

  return { chapter, listChapters };
};
