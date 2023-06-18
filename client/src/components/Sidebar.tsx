import { useContext } from "react";
import styles from "../assets/css/components/sidebar.module.css";
import { ThemeContext } from "../context/ThemeContext";

type sideProps = {
  active: boolean;
  onClose: () => void;
};

export const Sidebar = ({ active, onClose }: sideProps) => {
  const { state, dispatch } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  return (
    <div className={`${styles.container} ${active && styles.active}`}>
      <div className={styles.wrapper}>
        <div className={styles.background} onClick={onClose}></div>
        <div className={`${styles.content} ${theme}`}>
          Sidebar
          <button onClick={onClose}>X</button>
          <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
};
