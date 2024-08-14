import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { usersData } from "./data.ts";
import { IsLoggedContext } from "./App.tsx";

import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();
  const { setIsLoggedIn } = useContext(IsLoggedContext);

  const onSubmit: SubmitHandler<FormFields> = ({ email, password }) => {
    const checkUser = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (checkUser) {
      setIsLoggedIn(true);
    } else {
      setError("root", { message: "Not correct email or password" });
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              if (!value.includes("@")) {
                return "Email must include @";
              }
              return true;
            },
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && <div>{errors.email.message}</div>}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must have at least 4 characters",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <div>{errors.password.message}</div>}
        <button type="submit">Login</button>
        {errors.root && <div>{errors.root.message}</div>}
      </form>
    </>
  );
};

export default LoginForm;
