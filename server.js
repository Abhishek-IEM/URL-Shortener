import express from "express";
import mongoose from "mongoose";
import { shortUrl, getOriginalUrl } from "./controllers/url.js";
import { config } from "dotenv";

const app = express();

config({ path: ".env" });

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "URL_Shortener",
  })
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));

// rendering the ejs file
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

// shorting url logic
app.post("/short", shortUrl);

// redirect to original url using short code :- dynamic routing
app.get("/:shortCode", getOriginalUrl);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
