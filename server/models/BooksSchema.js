import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    stars: {
      type: Number,
    },
    category: {
      type: Array,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
const Books = mongoose.model("Book", BooksSchema);
export default Books;
