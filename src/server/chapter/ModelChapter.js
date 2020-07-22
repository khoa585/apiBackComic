import request from "request-promise";
import cheerio from "cheerio";

import { Chapter } from "../../model/chapter";

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
  const chapter = await Chapter.findById(chapterId);
  if (chapter.images.length === 0) {
    const images = await getImageLinks(chapter.url);
    chapter.images = [...images];
    await chapter.save();
  }
  chapter.views++;
  await chapter.save();
  return chapter;
};
