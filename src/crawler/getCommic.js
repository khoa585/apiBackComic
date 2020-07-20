const request = require("request-promise");
let cheerio = require("cheerio");
let commicDb = require("./../model/commic");
const URL_PAGE="http://www.nettruyen.com/?page=";
 const getListInLink= async (page)=>{
    let url = URL_PAGE + page;
    let resultData = await request(url);
    let $ = cheerio.load(resultData);
    let listCommic = $(".item");
    let listLink = [];
    listCommic.each(function(i,element){
        let linkCommic = cheerio.load(element)("figure > div > a ").attr("href");
        listLink.push(linkCommic);
    })
    let listPromise = listLink.map(item=>addCommic(item));
    let dataPromise = await Promise.all(listPromise);
    console.log(dataPromise.length);
    return dataPromise.length ;
}
const getDetialCommic =  async (url,commicId)=>{
    let data = await  request({
        uri:url
    })
    const $ = cheerio.load(data);
    const listChapter =[];
    const listGenders = [];
    let objects ={};
    objects["name"]= $("#item-detail > h1").text();
    objects["author"]=$("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.author.row > p.col-xs-8 > a").text();
    objects["status"]=$("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.status.row > p.col-xs-8").text();
    let genders = $("#item-detail > div.detail-info > div > div.col-xs-8.col-info > ul > li.kind.row > p.col-xs-8>a");
    genders.each(function(i,element){
        listGenders.push(cheerio.load(element).text());
    })
    objects["genders"]= listGenders ;
    console.log(objects);
}
const addCommic = (Link)=>{
    return commicDb.create({url:Link});
}
const listCommitNotUpdate= ()=>{
    return commicDb.find({
        $or:[
            {
                description:{ $exists: false }
            },
            {
                chapters:{$size:0}
            }
        ]

    })
}

module.exports = {
    getListInLink,
    getDetialCommic
}