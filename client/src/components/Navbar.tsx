import styles from "../assets/css/components/navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={`ctn ${styles.wrapper}`}>
        <h4>KWatch</h4>
      </div>
    </div>
  );
};
