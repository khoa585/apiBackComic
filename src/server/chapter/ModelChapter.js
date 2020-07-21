import { Chapter } from "../../model/chapter";

export const getChapterByID = async (chapterId) => {
  return await Chapter.findById(chapterId);
};
