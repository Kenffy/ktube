import { useContext } from "react";
import styles from "../assets/css/components/sidebar.module.css";
import { ThemeContext } from "../context/ThemeContext";

type sideProps = {
  active: boolean;
  onClose: () => void;
};

export const Sidebar = ({ active, onClose }: sideProps) => {
  const { dispatch } = useContext(ThemeContext);
  return (
    <div className={`${styles.container} ${active && styles.active}`}>
      Sidebar
      <button onClick={onClose}>X</button>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>
    </div>
  );
};
