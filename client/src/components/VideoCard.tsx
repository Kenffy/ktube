import { useNavigate } from "react-router-dom";
import styles from "../assets/css/components/videocard.module.css";
import { format } from "timeago.js";

type videoProps = {
  video?: any;
};

export const VideoCard = ({ video }: videoProps) => {
  const navigate = useNavigate();

  const handleOnVideo = () => {
    navigate(video ? `/videos/${video?._id}` : `/videos/test`);
  };

  const tempCover =
    "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C214%2C3008%2C1579&wid=1200&hei=630&scl=2.506666666666667";

  const tempTitle = `Drogues : labos et trafiquants partagent le magot - Politique & Eco
  n°394 avec Michel Gandilhon`;

  const cover: string = video ? video.imgUrl : tempCover;
  const title: string = video ? video.title : tempTitle;

  return (
    <div className={styles.container} onClick={handleOnVideo}>
      <img src={cover} alt="" className={styles.cover} />
      <div className={styles.wrapper}>
        <h5 className={styles.title}>{title}</h5>
        <div className={styles.actions}>
          <img
            src={
              video
                ? video.profile
                : "https://leadership.ng/wp-content/uploads/2023/03/davido.png"
            }
            alt=""
            className={styles.profile}
          />
          <span className={styles.channel}>
            {video ? video?.username : "Chaîne officielle TVL"}
          </span>
          <span className={styles.connections}>
            {video ? video?.views : "5230"} views
          </span>
          <span className={styles.connections}>
            {video ? format(video?.createdAt) : "2 days ago."}
          </span>
        </div>
      </div>
    </div>
  );
};
