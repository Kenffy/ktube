import { useContext } from "react";
import styles from "../assets/css/components/menu.module.css";
import { ThemeContext } from "../context/ThemeContext";

type menuProps = {
  owner: string;
  userId: string;
};
export const CommentMenu = ({ owner, userId }: menuProps) => {
  const { state } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  return (
    <div className={`${styles.wrapper} ${theme}`}>
      {owner === userId && (
        <>
          <span
            className={styles.menuItem}
            onClick={() => console.log("edit comment")}
          >
            <span className="fa-solid fa-pen-to-square"></span>
            <span>Edit</span>
          </span>
          <span
            className={styles.menuItem}
            onClick={() => console.log("delete comment")}
          >
            <span className="fa-solid fa-trash-can"></span>
            <span>Delete</span>
          </span>
        </>
      )}
      <span
        className={styles.menuItem}
        onClick={() => console.log("report comment")}
      >
        <span className="fa-regular fa-flag"></span>
        <span>Report</span>
      </span>
    </div>
  );
};
