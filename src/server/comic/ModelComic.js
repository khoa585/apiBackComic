const ComicDb = require("../../model/comic");
import { getData, putData } from "./../../common/cache";
import {getDataRedis} from './../../common/redis';
export const getComicById = async (comicId) => {
  const comic = await ComicDb.findById(comicId).populate({
    path: "chapters",
    select: {
      name: 1,
      views: 1,
      updatedAt: 1,
    },
    options: {
      sort: { index: -1 },
    },
  });
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
      .populate({ path: "chapters", select: ["name", "updateAt", "views"] });
  } else {
    result = await ComicDb.find({
      enable: true,
    })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * numberItem)
      .limit(numberItem)
      .populate({ path: "chapters", select: ["name", "updateAt", "views"] });
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
    .populate({path: "chapters", select: ["name", "updateAt", "views"]});
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
export const getListTop = async (type)=>{
      let key = `LIST_TOP-${type}`;
      let dataCache = getData(key);
      if(dataCache) return dataCache ;
      const time = new Date();
      let keyRedis ;
      //type 1: MonTh
      //type 2 : Wek
      //type 3: Day
      if(type==1){
          keyRedis=`TOP_MONTH-${time.getMonth()}-${time.getFullYear()}`;
      }else if(type==2){
          keyRedis=`TOP_WEK-${time.getWeek()}-${time.getFullYear()}}`
      }
      else {
          keyRedis=`TOP_DAY-${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`; 
      }
      let dataRedis = await getDataRedis(keyRedis);
      if(!dataRedis){return []}
      dataRedis= JSON.parse(dataRedis);
      let objectTop = [];
      for(let property in dataRedis){
          objectTop.push({
              id:property,
              views:dataRedis[property]
          })
      }
      let comicId = objectTop.sort((a,b)=> {
          if(a.views>b.views)return -1 ;
          if(a.views<b.views)return 1 ;
          return  0 ;
      });
      console.log(comicId);
}