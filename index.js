const PORT = 8080;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const articles = [];

app.get("/", (req, res) => {
  res.json("Welcome to my Climate Change News API");
});

app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
