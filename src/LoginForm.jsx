import { useContext, useEffect, useState } from "react";
import { usersData } from "./data";
import { IsLoggedContext } from "./App";

const LoginForm = ({ onLogin }) => {
  const [usersFields, setUsersFields] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedContext);

  const MIN_PASSWORD_LENGTH = 4;

  const onEmailChange = (e) => {
    setUsersFields({
      ...usersFields,
      email: e.target.value,
    });
  };

  const onPasswordChange = (e) => {
    setUsersFields({
      ...usersFields,
      password: e.target.value,
    });
  };

  useEffect(() => {
    if (!isFormSubmitted) {
      return;
    }
    if (usersFields.password.length < MIN_PASSWORD_LENGTH) {
      setError("Short password");
      return;
    } else {
      setError("");
    }
  }, [usersFields, isFormSubmitted]);

  const onSubmit = (e) => {
    const { email, password } = usersFields;
    e.preventDefault();

    setIsFormSubmitted(true);

    const checkUser = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (checkUser) {
      setIsLoggedIn(true);
    } else {
      setError("Not correct email or password");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label>Email: </label>
          <input
            name="email"
            type="text"
            required
            value={usersFields.email}
            onChange={onEmailChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type="password"
            required
            value={usersFields.password}
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default LoginForm;
