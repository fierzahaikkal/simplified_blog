import Connection from "../config/dbconf.js";
import crypto from "crypto";

export const getPosts = (req, res) => {
  const sql = "SELECT * FROM posts";

  Connection.query(sql, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    res.status(200).json({
      payload: result,
      message: "Postingan Berhasil ditampilkan",
    });
  });
};

export const getPostById = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM posts WHERE id = '${req.params.id}'`;

  Connection.query(sql, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    if (result.length < 1) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    res.status(200).json({
      payload: result,
      message: "Data berhasil ditampilkan",
    });
  });
};

export const addPost = (req, res) => {
  const data = { ...req.body };
  const image = req.file.path;
  if (!req.file || !req.file.path) {
    return res.sendStatus(400);
  }
  const uuid = crypto.randomUUID();
  const sql = `INSERT INTO posts (id, title, body, image, user_id, status, categories) VALUES ('${uuid}', '${data.title}', '${data.body}', '${image}','${data.user_id}', '${data.status}', '${data.categories}')`;
  Connection.query(sql, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    res.status(200).json({
      payload: result,
      message: "Berhasil ditambahkan",
    });
  });
};

export const editPost = (req, res) => {
  const data = { ...req.body };
  const id = req.params.id;
  const sql = `UPDATE posts SET ? WHERE id = '${id}'`;

  Connection.query(sql, data, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    if (result.affectedRows < 1) {
      return res.status(404).json({ message: "NOT FOUND" });
    }

    res.status(200).json({
      payload: result,
      message: "Berhasil di update",
    });
  });
};

export const deletePost = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM posts WHERE id = '${id}'`;
  Connection.query(sql, (err, result) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    if (result.affectedRows < 1) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    res.status(200).json({
      payload: result,
      message: "Berhasil delete",
    });
  });
};
