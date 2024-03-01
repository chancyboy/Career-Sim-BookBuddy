import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Account from "./components/Account";
import Register from "./components/Register";
import Navigation from "./components/Navigations";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");
    setToken(localToken);
    setUser(localUser);
  }, []);

  return (
    <>
      <div>
        <Navigation token={token} user={user} />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/Register" element={<Register setToken={setToken} />} />
          <Route
            path="/Account"
            element={<Account token={token} user={user} setUser={setUser} />}
          />
          <Route path="/Book/:id" element={<SingleBook token={token} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
