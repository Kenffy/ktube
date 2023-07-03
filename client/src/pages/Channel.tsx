import { useContext, useState } from "react";
import styles from "../assets/css/pages/channel.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export const Channel = () => {
  const { state } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [onMenu, setOnMenu] = useState<boolean>(false);

  const handleAddVideo = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    navigate("/videos/create");
  };

  const handleAddShort = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    navigate("/shorts/create");
  };

  const theme = state.theme === "light" ? styles.light : styles.dark;

  return (
    <div className={styles.container}>
      <div className={styles.addBtnWrapper}>
        <button
          onClick={() => setOnMenu((prev) => !prev)}
          className={`${styles.addBtn} ${theme}`}
        >
          <i className={`fa-solid fa-plus ${onMenu && styles.active}`}></i>
        </button>
        <div
          className={`${styles.addBtnMenu} ${theme} ${onMenu && styles.active}`}
        >
          <span onClick={handleAddVideo}>
            <i className="fa-solid fa-video"></i>
            <small>Video</small>
          </span>
          <span onClick={handleAddShort}>
            <i className="fa-solid fa-mobile"></i>
            <small>Short</small>
          </span>
        </div>
      </div>
    </div>
  );
};
