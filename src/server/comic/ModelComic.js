import { ComicDb } from "../../model/comic";
import { getData, putData } from "./../../common/cache";

export const getComicById = async (comicId) => {
  return await ComicDb.findById(comicId);
};

export const getListComics = async (type, page, numberItem) => {
  let result;

  let key = `${type}-${page}-${numberItem}`;
  let valueCache = getData(key);
  if (valueCache) {
    return valueCache;
  }
  if (type === 1) {
    result = await ComicDb.find({
      enable: true,
    })
      .sort({ views: -1 })
      .skip((page - 1) * numberItem)
      .limit(numberItem)
      .populate("chapters", ["name", "updatedAt","views"]);
  } else {
    result = await ComicDb.find({
      enable: true,
    })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * numberItem)
      .limit(numberItem)
      .populate("chapters", ["name", "updatedAt","views"]);
  }
  let total = await ComicDb.countDocuments();
  let data = result.map((item) => {
    item.chapters = item.chapters.reverse().slice(0, 3);
    return item;
  });
  
  putData(key, { data, total });
  return { data, total };
};
