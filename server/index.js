import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validation/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/userController.js";
import {
  create,
  getAll,
  getOne,
  getTags,
  remove,
  update,
} from "./controllers/PostController.js";
import handleErrors from "./utils/handleErrors.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0.efa0wlk.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((e) => {
    console.log("db ne ok", e);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/upload", express.static("uploads"));

app.post("/login", loginValidation, handleErrors, login);
app.post("/registration", registerValidation, handleErrors, register);
app.get("/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  });
});

app.get("/posts", getAll);
app.get("/tags", getTags);
app.get("/posts/:id", getOne);
app.post("/posts", checkAuth, postCreateValidation, handleErrors, create);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, handleErrors, update);

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server ok");
});
