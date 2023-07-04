import styles from "../assets/css/components/playlistcard.module.css";

export const PlaylistCard = () => {
  const cover =
    "https://www.thestreet.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTY3NTQxMjM0MTA0ODA1MjYy/intel-shares-climb-231-since-quant-ratings-upgrade.png";
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.coverWrapper}>
          <img src={cover} alt="" className={styles.cover} />
          <div className={styles.iconWrapper}>
            <span>22</span>
            <i className="fa-solid fa-bars-staggered"></i>
          </div>
        </div>
        <span className={styles.title}>List Name</span>
      </div>
    </div>
  );
};
