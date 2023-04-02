import Connection from "../config/dbconf.js";
import bcrypt from "bcrypt";

export const login = (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM user WHERE username = ${username}`;

  Connection(sql, (username, password), (err, result) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    if (result.length < 1) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    //check password
    const match = bcrypt.compareSync(password, result[0].password);
    if (!match) {
      return res.status(404).json({ message: "username/password salah" });
    }
    req.session.loggedIn = true;
    req.session.userId = req.body.id;
    res.status(200).json({
      payload: result,
      message: "Berhasil login",
    });
  });
};
