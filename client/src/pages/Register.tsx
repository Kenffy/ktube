import React, { useContext, useRef, useState } from "react";
import styles from "../assets/css/pages/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { register } from "../services/services";

export const Register = () => {
  const { state } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const theme = state.theme === "light" ? styles.light : styles.dark;

  const handleClear = () => {
    if (emailRef.current) {
      emailRef.current.value = "";
    }
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const username = userRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    if (!username || !email || !password) {
      setErrorMessage("Username, email and password are required.");
      return;
    }

    try {
      const res = await register({ username, email, password });
      if (res.status === 200) {
        navigate("/login");
        handleClear();
      } else {
        setErrorMessage(
          "Please fill all mandatory fields, verify your email and password and try again."
        );
      }
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
        <form className={styles.form}>
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
          <button
            onClick={handleSubmit}
            className={styles.button}
            type="submit"
          >
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
