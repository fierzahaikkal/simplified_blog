import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

import config from "./config/session.config.js";
import postsRoute from "./routes/post.routes.js";
import upload from "./controller/uploader.controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(session(config));

app.use(express.static("public"));

app.use(multer(upload).single("images"), postsRoute);

app.get("/", (req, res) => {
  console.log("Welcome index");
  res.send("Welcome peeps");
});

app.listen(process.env.PORT || 3000, "localhost", () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});
