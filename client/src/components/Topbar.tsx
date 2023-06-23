import React, { useContext, useState } from "react";
import styles from "../assets/css/components/topbar.module.css";
import { ThemeContext } from "../context/ThemeContext";
import avatar from "../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Topbar = () => {
  const navigate = useNavigate();
  const { state } = useContext(ThemeContext);

  const [search, setSearch] = useState<string>("");
  const [onSide, setOnSide] = useState<boolean>(false);
  const [onMenu, setOnMenu] = useState<boolean>(false);
  //const [onFocus, setOnFocus] = useState<boolean>(false);
  const [onSearch, setOnSearch] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLogin = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    navigate("/login");
  };

  const handleRegister = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    navigate("/register");
  };

  const handleLogout = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    console.log("logout");
  };

  const handleToggleSideMenu = () => {
    setOnSide((prev) => !prev);
  };

  const handleCloseSideMenu = () => {
    setOnSide(false);
  };

  const theme = state.theme === "light" ? styles.light : styles.dark;
  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`ctn ${styles.wrapper}`}>
        <div className={styles.large}>
          <div className={`${styles.logo} ${theme}`}>
            <a href="/">
              <h4>KWatch</h4>
            </a>
          </div>
          <div className={styles.largeLeft}>
            <div className={styles.search}>
              <div className={styles.searchIcon}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                onChange={handleChange}
                type="text"
                value={search}
                placeholder="Search"
                // onFocus={() => setOnFocus(true)}
                // onBlur={() => setOnFocus(false)}
              />
              <div className={styles.searchIcon} onClick={() => setSearch("")}>
                {search !== "" && <i className="fa-solid fa-xmark"></i>}
              </div>
            </div>

            <div className={styles.navItem}>
              <i className="fa-solid fa-bell"></i>
            </div>
            <div
              className={styles.navItem}
              tabIndex={0}
              onBlur={() => setOnMenu(false)}
              onClick={() => setOnMenu((prev) => !prev)}
            >
              <img src={avatar} alt="avatar" />
              {onMenu && (
                <div className={`${styles.menu} ${theme}`}>
                  <span onClick={handleLogin}>Login</span>
                  <span onClick={handleRegister}>Register</span>
                  <span onClick={handleLogout}>Logout</span>
                </div>
              )}
            </div>
            <div className={styles.navItem} onClick={handleToggleSideMenu}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>

        <div className={styles.small}>
          {!onSearch ? (
            <div className={styles.smallLeft}>
              <div className={`${styles.logo} ${theme}`}>
                <a href="/">
                  <h4>KWatch</h4>
                </a>
              </div>
              <div className={styles.smallItems}>
                <div
                  className={styles.navItem}
                  onClick={() => setOnSearch(true)}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className={styles.navItem}>
                  <i className="fa-solid fa-bell"></i>
                </div>
                <div
                  className={styles.navItem}
                  tabIndex={0}
                  onBlur={() => setOnMenu(false)}
                  onClick={() => setOnMenu((prev) => !prev)}
                >
                  <img src={avatar} alt="avatar" />
                  {onMenu && (
                    <div className={`${styles.menu} ${theme}`}>
                      <span onClick={handleLogin}>Login</span>
                      <span onClick={handleRegister}>Register</span>
                      <span onClick={handleLogout}>Logout</span>
                    </div>
                  )}
                </div>
                <div className={styles.navItem} onClick={handleToggleSideMenu}>
                  <i className="fa-solid fa-bars"></i>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.smallRight}>
              <div
                className={styles.navItem}
                onClick={() => setOnSearch(false)}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              <div className={styles.search}>
                <div className={styles.searchIcon}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <input
                  onChange={handleChange}
                  type="text"
                  value={search}
                  placeholder="Search"
                  // onFocus={() => setOnFocus(true)}
                  // onBlur={() => setOnFocus(false)}
                />

                <div
                  className={styles.searchIcon}
                  onClick={() => setSearch("")}
                >
                  {search !== "" && <i className="fa-solid fa-xmark"></i>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Sidebar active={onSide} onClose={handleCloseSideMenu} />
    </div>
  );
};
