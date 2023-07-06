import { useNavigate } from "react-router-dom";
import styles from "../assets/css/components/shortcard.module.css";

type videoProps = {
  video?: any;
};

export const ShortCard = ({ video }: videoProps) => {
  const navigate = useNavigate();

  const handleOnShort = () => {
    navigate(`/shorts/${video?._id}`);
  };

  return (
    <div className={styles.container} onClick={handleOnShort}>
      <img src={video?.imgUrl} alt={video?.title} className={styles.cover} />
      <div className={styles.wrapper}>
        <h5 className={styles.title}>{video?.title}</h5>
        <div className={styles.actions}>
          <img
            src={video?.profile}
            alt={video?.username}
            className={styles.profile}
          />
          <div className={styles.actionWrapper}>
            <span className={styles.channel}>{video?.username}</span>
            <span className={styles.connections}>{video?.views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};
