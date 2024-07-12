import { useState } from "react";

import { users } from "./data";
import UsersList from "./UsersList";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 4) {
      setError("Short password");
      return;
    }

    const checkUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (checkUser) {
      setIsLoggedIn(true);
    } else {
      setError("Not correct email or password");
    }
  }

  if (isLoggedIn) {
    return <UsersList />;
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
