import { useState } from "react";
import { registerUser } from "../API";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Register.css";

export default function Register({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userObj = {
      firstName,
      lastName,
      email,
      password,
    };

    if (firstName == "" && lastName == "" && email == "" && password == "") {
      setError("Please fill in all required fields");
    } else {
      const nextToken = await registerUser(userObj);
      setToken(nextToken);
      setError(null);
      navigate("/account");
    }
  };

  return (
    <main>
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <p className="login-error">{error}</p>}
          <div>
            <label>
              <p className="label-first-name">First Name:</p>
              <input
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                placeholder="First Name"
              ></input>
            </label>
          </div>
          <div>
            <label>
              <p className="label-last-name">Last Name:</p>
              <input
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                placeholder="Last Name"
              ></input>
            </label>
          </div>
          <div>
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
          <div>
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
          <button>Register</button>
          <div>
            <Link to="/Login">
              Already have an account? Click her to sign in.
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
