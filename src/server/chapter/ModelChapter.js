import { Chapter } from "../../model/chapter";
const getImageLinks = require("../../crawler/getDetailChapter");

export const getChapterByID = async (chapterId) => {
  const chapter = await Chapter.findById(chapterId);
  if (chapter.images.length === 0) {
    const images = await getImageLinks(chapter.url);
    chapter.images = [...images];
    await chapter.save();
  }
  return chapter;
};
