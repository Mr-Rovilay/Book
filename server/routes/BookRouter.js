import express from "express";
import Book from "../models/BooksSchema.js";
import multer from "multer";

const BookRouter = express.Router();
BookRouter.use(express.json());

BookRouter.get("/", async (req, res) => {
  try {
    const category = req.query.category;

    const filter = {};
    if (category) {
      filter.category = category;
    }
    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

BookRouter.get("/:slug", async (req, res) => {
  try {
    const slugParams = req.params.slug;

    const data = await Book.findOne({ slug: slugParams });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

BookRouter.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
    });

    await Book.create(newBook);
    res.json("data submitted");
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

BookRouter.put("/", upload.single("thumbnail"), async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updateBook);
    res.json("data submitted");
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

BookRouter.delete("/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    await Book.deleteOne({ _id: bookId });
    res.json("How dare you!" + req.body.bookId);
  } catch (error) {
    res.json(error);
  }
});

export default BookRouter;
