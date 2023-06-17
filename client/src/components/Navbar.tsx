import styles from "../assets/css/components/navbar.module.css";
import avatar from "../assets/images/avatar.png";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const Navbar = () => {
  const [onSide, setOnSide] = useState<boolean>(false);

  const handleOpen = () => {
    setOnSide((prev) => !prev);
  };

  const handleClose = () => {
    setOnSide(false);
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
        <div className={styles.options}>
          <div className={styles.search}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
            {/* <i className="fa-solid fa-xmark"></i> */}
          </div>
          <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.menu}>
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

/* <div className={styles.links}>
  <NavLink
    to="/"
    className={({ isActive }) => (isActive ? styles.activeLink : "")}
  >
    Home
  </NavLink>
  <NavLink
    to="/videos"
    className={({ isActive }) => (isActive ? styles.activeLink : "")}
  >
    Videos
  </NavLink>
</div> */
