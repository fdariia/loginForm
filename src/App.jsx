import { useState } from "react";
import "./App.css";
import LoginForm from "./LoginForm";
import UsersList from "./UsersList";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => {
    return setIsLoggedIn(true);
  };

  return <>{isLoggedIn ? <UsersList /> : <LoginForm onLogin={onLogin} />}</>;
};

export default App;
