import styles from "../assets/css/pages/single.module.css";

export const Single = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>Left</div>
        <div className={styles.rightWrapper}>Right</div>
      </div>
    </div>
  );
};
