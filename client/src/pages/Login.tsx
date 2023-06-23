import React, { useContext, useRef, useState } from "react";
import styles from "../assets/css/pages/login.module.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export const Login = () => {
  const { state } = useContext(ThemeContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const userRef = useRef<any>(null);
  const passRef = useRef<any>(null);

  const theme = state.theme === "light" ? styles.light : styles.dark;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const username = userRef?.current?.value;
    const password = userRef?.current?.value;

    try {
      console.log({ username, password });
    } catch (error) {
      console.log(error);
      setErrorMessage("Oop! Something went wrong!");
    }
  };

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`${styles.wrapper} ${theme}`}>
        <h2 className={styles.heading}>Sign In</h2>
        {errorMessage && (
          <span className={styles.errorMsg}>{errorMessage}</span>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <button className={styles.button} type="submit">
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
