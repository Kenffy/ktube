import { useContext } from "react";
import styles from "../assets/css/components/menu.module.css";
import { ThemeContext } from "../context/ThemeContext";

export const VideoMenu = () => {
  const { state } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  return (
    <div className={`${styles.wrapper} ${theme}`}>
      <span
        className={styles.menuItem}
        onClick={() => console.log("add to list")}
      >
        <span className="fa-solid fa-layer-group"></span>
        <span>Save</span>
      </span>
      <span
        className={styles.menuItem}
        onClick={() => console.log("report video")}
      >
        <span className="fa-regular fa-flag"></span>
        <span>Report</span>
      </span>
    </div>
  );
};
