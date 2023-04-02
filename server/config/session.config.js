import dotenv from "dotenv";

dotenv.config();
const OneMinute = 1000 * 60;

const config = {
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: OneMinute,
    secure: false,
  },
};

export default config;
