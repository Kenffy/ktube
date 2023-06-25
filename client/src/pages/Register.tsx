import React, { useContext, useRef, useState } from "react";
import styles from "../assets/css/pages/register.module.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export const Register = () => {
  const { state } = useContext(ThemeContext);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRef = useRef<any>(null);
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
        <h2 className={styles.heading}>Sign Up</h2>
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
            type="email"
            ref={emailRef}
            placeholder="Email"
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
            By registering in you are agreeing to our Terms of Services and
            Privacy Policy.
          </span>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
          <div className={styles.action}>
            Already an Account? Sign in <Link to="/login">here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
