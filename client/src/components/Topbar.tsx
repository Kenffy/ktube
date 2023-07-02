import React, { useContext, useState } from "react";
import styles from "../assets/css/components/topbar.module.css";
import { ThemeContext } from "../context/ThemeContext";
import avatar from "../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../types/types";
import { logout } from "../services/services";
import { userLogout } from "../redux/userSlice";

export const Topbar = () => {
  const { currentUser, authUser } = useSelector(
    (state: StateProps) => state.user
  );

  const navDispatch = useDispatch();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ThemeContext);

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

  const handleLogout = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const res = await logout(authUser?.refreshToken);
    if (res.status === 200) {
      navDispatch(userLogout());
    }
    setOnMenu(false);
  };

  const handleToggleSideMenu = () => {
    setOnSide((prev) => !prev);
  };

  const handleCloseSideMenu = () => {
    setOnSide(false);
  };

  const handleChannel = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    navigate(`/channel/${currentUser?._id}`);
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
              <img
                src={currentUser?.profile ? currentUser.profile : avatar}
                alt="avatar"
              />
              {onMenu && (
                <div className={`${styles.menu} ${theme}`}>
                  {currentUser ? (
                    <span className={styles.profileWrapper}>
                      <img
                        src={
                          currentUser?.profile ? currentUser.profile : avatar
                        }
                        alt=""
                      />
                      <div className={styles.menuProfileInfos}>
                        <span className={styles.menuChannel}>
                          {currentUser?.username}
                        </span>
                        <span
                          onClick={handleChannel}
                          className={styles.menuLink}
                        >
                          My Channel
                        </span>
                      </div>
                    </span>
                  ) : (
                    <>
                      <p className={styles.menuDesc}>
                        Sign in to like videos, comment and subscribe.
                      </p>
                      <span onClick={handleLogin} className={styles.menuItem}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <span>Login</span>
                      </span>
                    </>
                  )}
                  {currentUser && (
                    <>
                      <span className={styles.menuItem}>
                        <i className="fa-solid fa-gear"></i>
                        <span>Settings</span>
                      </span>
                      <span className={styles.menuItem}>
                        <i className="fa-solid fa-flag"></i>
                        <span>Report</span>
                      </span>
                    </>
                  )}
                  <span className={styles.menuItem}>
                    <i className="fa-solid fa-circle-question"></i>
                    <span>Help</span>
                  </span>
                  <span
                    onClick={() => dispatch({ type: "TOGGLE_THEME" })}
                    className={styles.menuItem}
                  >
                    <i className="fa-solid fa-circle-half-stroke"></i>
                    <span>Dark Mode</span>
                  </span>
                  {currentUser && (
                    <span onClick={handleLogout} className={styles.menuItem}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Logout</span>
                    </span>
                  )}
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
                  <img
                    src={currentUser?.profile ? currentUser.profile : avatar}
                    alt="avatar"
                  />
                  {onMenu && (
                    <div className={`${styles.menu} ${theme}`}>
                      {currentUser ? (
                        <span className={styles.profileWrapper}>
                          <img
                            src={
                              currentUser?.profile
                                ? currentUser.profile
                                : avatar
                            }
                            alt=""
                          />
                          <div className={styles.menuProfileInfos}>
                            <span className={styles.menuChannel}>
                              {currentUser?.username}
                            </span>
                            <span
                              onClick={handleChannel}
                              className={styles.menuLink}
                            >
                              My Channel
                            </span>
                          </div>
                        </span>
                      ) : (
                        <>
                          <p className={styles.menuDesc}>
                            Sign in to like videos, comment and subscribe.
                          </p>
                          <span
                            onClick={handleLogin}
                            className={styles.menuItem}
                          >
                            <i className="fa-solid fa-right-to-bracket"></i>
                            <span>Login</span>
                          </span>
                        </>
                      )}
                      {currentUser && (
                        <>
                          <span className={styles.menuItem}>
                            <i className="fa-solid fa-gear"></i>
                            <span>Settings</span>
                          </span>
                          <span className={styles.menuItem}>
                            <i className="fa-solid fa-flag"></i>
                            <span>Report</span>
                          </span>
                        </>
                      )}
                      <span className={styles.menuItem}>
                        <i className="fa-solid fa-circle-question"></i>
                        <span>Help</span>
                      </span>
                      <span
                        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
                        className={styles.menuItem}
                      >
                        <i className="fa-solid fa-circle-half-stroke"></i>
                        <span>Dark Mode</span>
                      </span>
                      {currentUser && (
                        <span
                          onClick={handleLogout}
                          className={styles.menuItem}
                        >
                          <i className="fa-solid fa-right-from-bracket"></i>
                          <span>Logout</span>
                        </span>
                      )}
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
