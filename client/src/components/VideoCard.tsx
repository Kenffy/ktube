import { useNavigate } from "react-router-dom";
import styles from "../assets/css/components/videocard.module.css";

export const VideoCard = () => {
  const navigate = useNavigate();

  const handleOnVideo = () => {
    navigate("/videos/test");
  };
  return (
    <div className={styles.container} onClick={handleOnVideo}>
      <img
        src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C214%2C3008%2C1579&wid=1200&hei=630&scl=2.506666666666667"
        alt=""
        className={styles.cover}
      />
      <div className={styles.wrapper}>
        <h5 className={styles.title}>
          Drogues : labos et trafiquants partagent le magot - Politique & Eco
          n°394 avec Michel Gandilhon
        </h5>
        <div className={styles.actions}>
          <img
            src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
            alt=""
            className={styles.profile}
          />
          <span className={styles.channel}>Chaîne officielle TVL</span>
          <span className={styles.connections}>5230 Subscribers</span>
        </div>
      </div>
    </div>
  );
};
