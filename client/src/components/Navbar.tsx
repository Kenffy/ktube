import { useNavigate } from "react-router-dom";
import styles from "../assets/css/components/navbar.module.css";
import avatar from "../assets/images/avatar.png";
import { ThemeContext } from "../context/ThemeContext";
import { Sidebar } from "./Sidebar";
import { useContext, useState } from "react";

export const Navbar = () => {
  const { state } = useContext(ThemeContext);
  const [onSide, setOnSide] = useState<boolean>(false);
  const [onMenu, setOnMenu] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  //const searchRef = useRef<HTMLInputElement>(null);

  const theme = state.theme === "light" ? styles.light : styles.dark;
  const navigate = useNavigate();

  const handleOpen = () => {
    setOnSide((prev) => !prev);
  };

  const handleClose = () => {
    setOnSide(false);
  };

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

  return (
    <div className={styles.container}>
      <div className={`ctn ${styles.wrapper}`}>
        <div className={styles.logo}>
          <a href="/">
            <h4>
              KW<i className="fa-solid fa-video"></i>
            </h4>
          </a>
        </div>

        <div className={styles.logoMobile}>
          <a href="/">
            <h4>
              {!onSearch && (
                <>
                  KW<i className="fa-solid fa-video"></i>
                </>
              )}
            </h4>
          </a>
        </div>

        <div className={styles.mobile}>
          {onSearch ? (
            <div
              className={`${styles.icon}`}
              onClick={() => setOnSearch(false)}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </div>
          ) : (
            <div className={`${styles.icon}`} onClick={() => setOnSearch(true)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          )}

          {onSearch ? (
            <div className={styles.search}>
              <div className={styles.iconWrapper}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Search"
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
              />
              <div className={styles.iconWrapper}>
                {onFocus && search !== "" && (
                  <i className="fa-solid fa-xmark"></i>
                )}
              </div>
            </div>
          ) : (
            <>
              <div
                className={styles.avatar}
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

              <div className={styles.sideBar}>
                <div className={styles.icon} onClick={handleOpen}>
                  <i className="fa-solid fa-bars"></i>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.options}>
          <div className={styles.search}>
            <div className={styles.iconWrapper}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search"
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
            />
            <div className={styles.iconWrapper}>
              {onFocus && search !== "" && (
                <i className="fa-solid fa-xmark"></i>
              )}
            </div>
          </div>

          <div
            className={styles.avatar}
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

          <div className={styles.sideBar}>
            <div className={styles.icon} onClick={handleOpen}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
      <Sidebar active={onSide} onClose={handleClose} />
    </div>
  );
};
