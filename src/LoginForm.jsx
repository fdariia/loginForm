import { useEffect, useState } from "react";
import { usersData } from "./data";

const LoginForm = ({ onLogin }) => {
  const [usersFields, setUsersFields] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const minPasswordLength = 4;

  const onChange = (e) => {
    const { name, value } = e.target;
    setUsersFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isFormSubmitted) {
      return;
    }
    if (usersFields.password.length < minPasswordLength) {
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
      onLogin();
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
            onChange={onChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type="password"
            required
            value={usersFields.password}
            onChange={onChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default LoginForm;
