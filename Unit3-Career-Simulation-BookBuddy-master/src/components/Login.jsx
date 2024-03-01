import { useState } from "react";
import { loginUser } from "../API";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userObj = {
      email,
      password,
    };
    const nextToken = await loginUser(userObj);
    if (nextToken) {
      setToken(nextToken);
      navigate("/account");
      localStorage.setItem("token", nextToken);
      setError(null);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="login-error">{error}</p>}
          <div className="email-container">
            <label>
              <p className="label-email">Email:</p>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="Email"
              ></input>
            </label>
          </div>
          <div className="password-container">
            <label>
              <p className="label-password">Password:</p>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                placeholder="Password"
              ></input>
            </label>
          </div>
          <button>Login</button>
          <div>
            <Link to="/register">
              Don't have an account? Click here to sign up.
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
