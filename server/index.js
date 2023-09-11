import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./db/db.js";
import BookRouter from "./routes/BookRouter.js";
//import multer from "multer";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/uploads", express.static("uploads"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

app.use("/api/books", BookRouter);

app.get("/", (req, res) => {
  res.send("OK...my message");
});

app.listen(8000, () => console.log("server listening on port 8000"));
