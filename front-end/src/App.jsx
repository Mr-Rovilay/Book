import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import SingleBook from "./routes/Books/SingleBook";
import Footer from "./components/Footer";
import Book from "./routes/Books/Book";
import Header from "./components/Header";
import CreateBook from "./routes/Books/createBook";
import EditBook from "./routes/Books/editBook";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Book />} />
          <Route path="/books/:slug" element={<SingleBook />} />
          <Route path="/createBook" element={<CreateBook />} />
          <Route path="/editBook/:slug" element={<EditBook />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
