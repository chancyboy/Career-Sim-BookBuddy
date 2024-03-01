import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../API";
import { getBookReservations } from "../API";
import { deleteBookReservations } from "../API";
import "../CSS/Account.css";

export default function Account({ token, user, setUser }) {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [number, setnumber] = useState(1);

  useEffect(() => {
    async function fetchUser() {
      try {
        const nextUser = await getUser(token);
        localStorage.setItem("user", JSON.stringify(nextUser));
        setUser(nextUser);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchReservedBooks() {
      try {
        setReservedBooks(await getBookReservations(token));
      } catch (error) {
        console.error(error);
      }
    }
    if (token) {
      fetchUser();
      fetchReservedBooks();
    }
  }, [number]);

  return token ? (
    user && (
      <main>
        <div className="welcome-container">
          <h2 className="welcome-user">
            Welcome {user?.firstname} {user?.lastname}
          </h2>
        </div>
        <h2>Reserved Books:</h2>
        <div className="reserved-books">
          {reservedBooks.length ? (
            reservedBooks.map((book) => {
              return (
                <div key={book?.id} className="reserved-books-card">
                  <div className="reserved-books-image-container">
                    <img
                      className="reserved-books-image"
                      src={book?.coverimage}
                      alt={`The cover of ${book?.title}`}
                    />
                  </div>
                  <p className="reserved-books-title">{book?.title}</p>
                  <div className="delete-button-container">
                    <button
                      onClick={async () => {
                        await deleteBookReservations(token, book.id);
                        setnumber(number + 1);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>None.</p>
          )}
        </div>
      </main>
    )
  ) : (
    <main>
      <Link to="/Login">Please login before viewing this page.</Link>
    </main>
  );
}
