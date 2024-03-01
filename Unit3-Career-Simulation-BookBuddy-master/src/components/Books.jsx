import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../API";
import "../CSS/Books.css";

export default function Books() {
  const [librarysBooks, setLibrarysBooks] = useState([]);
  const [filterdBooks, setFilterdBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  function handleChange(e) {
    setSearchInput(e.target.value);
    const value = e.target.value;
    const filtered = librarysBooks.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterdBooks(filtered);
  }

  useEffect(() => {
    async function fetchBooks() {
      setLibrarysBooks(await getBooks());
    }
    fetchBooks();
  }, []);

  return (
    <main>
      <div className="search-bar">
        <input type="text" placeholder="Search Here" onChange={handleChange} />
      </div>
      <div className="books-library">
        {searchInput.length <= 0
          ? librarysBooks.map((book) => {
              return (
                <div key={book.id} className="book-card">
                  <div className="books-image-container">
                    <img
                      className="books-image"
                      src={book?.coverimage}
                      alt={`The cover of ${book?.title}`}
                    />
                  </div>

                  <p className="books-title">
                    <Link to={`/book/${book.id}`}>
                      <b>{book?.title}</b>
                    </Link>
                  </p>
                  <p className="books-author">{book?.author}</p>
                  <p className="books-description">{book?.description}</p>
                  <span className="books-status">{`Available: ${book.available}`}</span>
                </div>
              );
            })
          : filterdBooks.map((book) => {
              return (
                <div key={book.id} className="book-card">
                  <div className="books-image-container">
                    <img
                      className="books-image"
                      src={book?.coverimage}
                      alt={`The cover of ${book?.title}`}
                    />
                  </div>

                  <p className="books-title">
                    <Link to={`/book/${book.id}`}>
                      <b>{book?.title}</b>
                    </Link>
                  </p>
                  <p className="books-author">{book?.author}</p>
                  <p className="books-description">{book?.description}</p>
                  <span className="books-status">{`Available: ${book.available}`}</span>
                </div>
              );
            })}
      </div>
    </main>
  );
}
