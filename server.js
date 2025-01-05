import express from "express";
import mongoose from "mongoose";
import { shortUrl, getOriginalUrl } from "./controllers/url.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://as6119552:09VIuGVDYpCIUkyh@cluster0.fa4q9.mongodb.net/",
    {
      dbName: "URL_Shortener",
    }
  )
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

const port = 1000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
