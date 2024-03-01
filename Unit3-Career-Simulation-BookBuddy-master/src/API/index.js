const API_URl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export const registerUser = async (userObj) => {
  try {
    const response = await fetch(`${API_URl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: userObj.firstName,
        lastname: userObj.lastName,
        email: userObj.email,
        password: userObj.password,
      }),
    });
    const json = await response.json();
    return json.token;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (userObj) => {
  try {
    const response = await fetch(`${API_URl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userObj.email,
        password: userObj.password,
      }),
    });
    const json = await response.json();
    return json.token;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${API_URl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getBooks = async () => {
  try {
    const response = await fetch(`${API_URl}/books`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json.books;
  } catch (error) {
    console.error(error);
  }
};

export const getBookById = async (bookId) => {
  try {
    const response = await fetch(`${API_URl}/books/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json.book;
  } catch (error) {
    console.error(error);
  }
};

export const checkoutBook = async (token, bookId) => {
  try {
    await fetch(`${API_URl}/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        available: false,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const getBookReservations = async (token) => {
  try {
    const response = await fetch(`${API_URl}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    return json.reservation;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBookReservations = async (token, reservationId) => {
  try {
    await fetch(`${API_URl}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
