import { Router } from "express";
import multer from "multer";
import {
  getPosts,
  getPostById,
  addPost,
  editPost,
  deletePost,
} from "../controller/posts.controller.js";
import upload from "../controller/uploader.controller.js";

const router = Router();

router.get("/post", getPosts);
router.get("/post/:id", getPostById);
router.post("/post/add", addPost);
router.put("/post/edit/:id", editPost);
router.delete("/post/delete/:id", deletePost);

export default router;
