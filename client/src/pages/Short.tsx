import styles from "../assets/css/pages/short.module.css";
import { shortVideos } from "../seeds/shortData";
import { ShortPlayerCrad } from "../components/ShortPlayerCrad";

export const Short = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {shortVideos.map((shVideo) => (
          <ShortPlayerCrad key={shVideo.id} video={shVideo} />
        ))}
      </div>
    </div>
  );
};
