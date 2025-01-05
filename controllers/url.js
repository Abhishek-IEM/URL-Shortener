import { Url } from "../models/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  const shortUrl = `http://localhost:1000/${shortCode}`;

  //save to db
  const newUrl = new Url({ shortCode, longUrl });

  await newUrl.save();

  console.log("Short URL saved = ", newUrl);

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  //find on db
  const originalUrl = await Url.findOne({shortCode});

  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: "Invalid shortcode" });
  }
};