import React, { useContext, useRef, useState } from "react";
import styles from "../assets/css/pages/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { login } from "../services/services";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

export const Login = () => {
  const { state } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const theme = state.theme === "light" ? styles.light : styles.dark;

  const handleClear = () => {
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    const username = userRef.current?.value;
    const password = passRef.current?.value;

    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      const res = await login({ username, password });
      if (res.status === 200) {
        console.log(res.data);
        handleClear();
        dispatch(loginSuccess(res.data));
        navigate("/");
      } else {
        setErrorMessage(
          "Please fill all mandatory fields, verify your email and password and try again."
        );
        dispatch(loginFailure());
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Oop! Something went wrong!");
      dispatch(loginFailure());
    }
  };

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`${styles.wrapper} ${theme}`}>
        <h2 className={styles.heading}>Sign In</h2>
        {errorMessage && (
          <span className={styles.errorMsg}>{errorMessage}</span>
        )}
        <form className={styles.form}>
          <input
            type="text"
            ref={userRef}
            placeholder="Username"
            required={true}
            className={styles.input}
          />
          <input
            type="password"
            ref={passRef}
            placeholder="Password"
            required={true}
            className={styles.input}
          />
          <span className={styles.terms}>
            By logging in you are agreeing to our Terms of Services and Privacy
            Policy.
          </span>
          <button
            onClick={handleSubmit}
            className={styles.button}
            type="submit"
          >
            Sign In
          </button>
          <div className={styles.action}>
            No Account? Sign up <Link to="/register">here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
