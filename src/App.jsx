import { createContext, useState } from "react";
import "./App.css";
import LoginForm from "./LoginForm";
import UsersList from "./UsersList";

export const IsLoggedContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <IsLoggedContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        {isLoggedIn ? <UsersList /> : <LoginForm />}
      </IsLoggedContext.Provider>
    </>
  );
};

export default App;
