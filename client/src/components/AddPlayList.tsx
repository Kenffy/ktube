import { SetStateAction, useContext, useRef } from "react";
import styles from "../assets/css/components/addplaylist.module.css";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const AddPlayList = ({ open, setOpen }: Props) => {
  const { state } = useContext(ThemeContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = state.theme === "light" ? styles.light : styles.dark;

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = (e: any) => {
    e.preventDefault();

    if (inputRef.current) {
      console.log("Playlist added: ", inputRef.current.value);
      setOpen(false);
    }
  };
  return (
    <div className={`${styles.container} ${open && styles.active}`}>
      <div className={`${styles.wrapper} ${theme}`}>
        <div className={styles.headingWrapper}>
          <span className={styles.heading}>Add new list</span>
          <div className={styles.closeIcon} onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleCreate}>
          <input
            ref={inputRef}
            required={true}
            type="text"
            placeholder="List name"
          />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};
