import { useNavigate } from "react-router-dom";
import styles from "../assets/css/components/shortcard.module.css";

export const ShortCard = () => {
  const navigate = useNavigate();

  const handleOnShort = () => {
    navigate("/shorts/test");
  };

  return (
    <div className={styles.container} onClick={handleOnShort}>
      <img
        src="https://expertphotography.b-cdn.net/wp-content/uploads/2018/07/bubble-photography-6-1-1.jpg"
        alt=""
        className={styles.cover}
      />
      <div className={styles.wrapper}>
        <h5 className={styles.title}>
          Fake Crip Gang Member don’t know how to Crip walk!! 🤣🤣🤣🤣
          @dingbattlove
        </h5>
        <div className={styles.actions}>
          <img
            src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
            alt=""
            className={styles.profile}
          />
          <div className={styles.actionWrapper}>
            <span className={styles.channel}>Chaîne officielle TVL</span>
            <span className={styles.connections}>5230 Subscribers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
