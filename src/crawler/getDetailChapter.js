const request = require("request-promise");
const cheerio = require("cheerio");

const getImageLinks = async (uri) => {
  try {
    const response = await request.get(uri);
    const $ = await cheerio.load(response);
    let imageLinks = [];

    $(".page-chapter img").each(function (i, elem) {
      imageLinks[i] = $(this).attr("src");
    });
    console.log(imageLinks);

    return imageLinks;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getImageLinks;
