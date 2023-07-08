import styles from "../assets/css/components/videoskcard.module.css";

export const VideoSKCard = () => {
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
