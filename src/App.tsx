import { createContext, useState } from "react";
import "./App.css";
import LoginForm from "./LoginForm";
import UsersList from "./UsersList";

type TIsLogged = {
  setIsLoggedIn: (value: boolean) => void;
};

export const IsLoggedContext = createContext<TIsLogged>({} as TIsLogged);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <IsLoggedContext.Provider value={{ setIsLoggedIn }}>
        {isLoggedIn ? <UsersList /> : <LoginForm />}
      </IsLoggedContext.Provider>
    </>
  );
};

export default App;
