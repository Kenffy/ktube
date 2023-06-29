import styles from "../assets/css/pages/short.module.css";
import { shortVideos } from "../seeds/shortData";
import { ShortPlayerCrad } from "../components/ShortPlayerCrad";

type shortProps = {
  type: string;
};

export const Short = ({ type }: shortProps) => {
  console.log(type);
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
