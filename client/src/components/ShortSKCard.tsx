import styles from "../assets/css/components/shortskcard.module.css";

export const ShortSKCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cover}></div>
      <div className={styles.details}>
        <div className={styles.title}></div>
        <div className={styles.userInfos}>
          <div className={styles.profile}></div>
          <div className={styles.infos}></div>
        </div>
      </div>
    </div>
  );
};
