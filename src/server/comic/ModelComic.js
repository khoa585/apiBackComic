import { ComicDb } from "../../model/comic";
import { getData, putData } from "./../../common/cache";

export const getComicById = async (comicId) => {
  return await ComicDb.findById(comicId);
};

export const getListComics = async (type, page, numberItem) => {
  let result;
  let count;
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
      .populate("chapters");
    count = await ComicDb.countDocuments();
  } else {
    result = await ComicDb.find({
      enable: true,
    })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * numberItem)
      .limit(numberItem)
      .populate("chapters");
    count = await ComicDb.countDocuments();
  }

  const data = result.map((item) => {
    item.chapters = item.chapters.reverse().slice(0, 3);
    return item;
  });
  console.log(count);
  putData(key, data);
  return { data, total: count };
};
