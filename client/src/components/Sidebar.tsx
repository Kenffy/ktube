import { useContext } from "react";
import styles from "../assets/css/components/sidebar.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateProps } from "../types/types";

type sideProps = {
  active: boolean;
  onClose: () => void;
};

export const Sidebar = ({ active, onClose }: sideProps) => {
  const { state, dispatch } = useContext(ThemeContext);
  const navigate = useNavigate();
  const theme = state.theme === "light" ? styles.light : styles.dark;

  const { authUser } = useSelector((state: StateProps) => state.user);

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };
  return (
    <div className={`${styles.container} ${active && styles.active}`}>
      <div className={styles.wrapper}>
        <div className={styles.background} onClick={onClose}></div>
        <div className={`${styles.content} ${theme}`}>
          <div className={styles.topWrapper}>
            <div className={`${styles.logo} ${theme}`}>
              <a href="/">
                <h4>KWatch</h4>
              </a>
            </div>
            <div className={styles.topIcon} onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className={styles.bottomWrapper}>
            <NavLink to="/" onClick={onClose}>
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </NavLink>
            <NavLink to="/shorts" onClick={onClose}>
              <i className="fa-solid fa-compass"></i>
              <span>Shorts</span>
            </NavLink>
            <NavLink to="/videos/subscriptions" onClick={onClose}>
              <i className="fa-solid fa-users-rectangle"></i>
              <span>Subscriptions</span>
            </NavLink>

            <hr className={styles.separator} />

            <div className={`${styles.auth} ${theme}`}>
              <p>Sign in to like videos, comment and subscribe.</p>
              <button onClick={handleLogin}>Sign In</button>
            </div>

            <hr className={styles.separator} />

            <NavLink to="/videos/history" onClick={onClose}>
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>History</span>
            </NavLink>
            <NavLink to="/videos/playlist" onClick={onClose}>
              <i className="fa-solid fa-layer-group"></i>
              <span>Playlists</span>
            </NavLink>
            <NavLink to={`/channel/videos/${authUser?.id}`} onClick={onClose}>
              <i className="fa-solid fa-circle-play"></i>
              <span>My Videos</span>
            </NavLink>

            <hr className={styles.separator} />

            <NavLink to="/settings" onClick={onClose}>
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </NavLink>
            <NavLink to="/reports" onClick={onClose}>
              <i className="fa-solid fa-flag"></i>
              <span>Report</span>
            </NavLink>
            <NavLink to="/help" onClick={onClose}>
              <i className="fa-solid fa-circle-question"></i>
              <span>Help</span>
            </NavLink>
            <div
              className={styles.toggle}
              onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            >
              <i className="fa-solid fa-circle-half-stroke"></i>
              <span>Dark Mode</span>
            </div>

            <hr className={styles.separator} />

            <div className={styles.terms}>
              <div className={styles.termWrapper}>
                <span>Terms of Services</span>
                <span>Privacy Policy and Safety</span>
              </div>
              <span className={styles.termsRight}>
                Kenffy Tube © 2023 copyright All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
