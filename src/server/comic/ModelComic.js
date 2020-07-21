import { ComicDb } from "../../model/comic";
import { getData, putData } from "./../../common/cache";
import { get, put } from "request-promise";
import { query } from "express";

export const getComicById = async (comicId) => {
  const comic = await ComicDb.findById(comicId).populate("chapters", [
    "name",
    "views",
    "updatedAt",
  ]);
  return comic;
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
      .populate("chapters", ["name", "updatedAt", "views"]);
  } else {
    result = await ComicDb.find({
      enable: true,
    })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * numberItem)
      .limit(numberItem)
      .populate("chapters", ["name", "updatedAt", "views"]);
  }
  let total = await ComicDb.countDocuments();
  let data = result.map((item) => {
    item.chapters = item.chapters.reverse().slice(0, 3);
    return item;
  });

  putData(key, { data, total });
  return { data, total };
};

export const searchListComics = async (name, authors, page, numberitem) => {
  const key = `${name}-${authors}-${page}-${numberitem}`;
  let valueCache = getData(key);
  if (valueCache) {
    return valueCache;
  }
  let regex;
  let query = {
    enable: true,
  };

  if (name.trim().length) {
    regex = new RegExp(name);
    query["name"] = { $regex: regex, $options: "i" };
  }
  if (authors.trim().length) {
    regex = new RegExp(authors);
    query["authors"] = { $regex: regex, $options: "i" };
  }

  const result = await ComicDb.find(query)
    .skip((page - 1) * numberitem)
    .limit(numberitem)
    .populate("chapters", ["name", "updateAt", "views"]);
  const comics = result.map((item) => {
    item.chapters = item.chapters.reverse().slice(0, 3);
    return item;
  });

  const total = (await ComicDb.find(query)).length;
  putData(key, { comics, total });
  return { comics, total };
};

// export const searchListComics = async (query, page, numberitem) => {
//   const key = `${query}-${page}-${numberitem}`;
//   const cacheValue = getData(key);
//   if (cacheValue) {
//     console.log("Run cacheValue");
//     return cacheValue;
//   } else {
//     console.log("Run here");
//     let q = ComicDb.find({
//       enable: true,
//     });

//     const regex = new RegExp(query, "i");

//     //GET data in field name
//     const searchByName = q
//       .regex("name", regex)
//       .skip((page - 1) * numberitem)
//       .limit(numberitem)
//       .populate("chapters", ["name", "createdAt", "views"]);
//     console.log("Running");
//     const resultByName = await searchByName.exec();
//     const searchByAuthor = q
//       .regex("authors", regex)
//       .skip((page - 1) * numberitem)
//       .limit(numberitem)
//       .populate("chapters", ["name", "createdAt", "views"]);
//     const resultByAuthor = await searchByAuthor.exec();

//     let comics = [...resultByAuthor, ...resultByName];
//     comics = comics.map((item) => {
//       item.chapters = item.chapters.reverse().slice(0, 3);
//       return item;
//     });
//     const total =
//       (await searchByAuthor.exec()).length + (await searchByName.exec()).length;
//     putData(key, { comics, total });
//     return { comics, total };
//   }
// };
