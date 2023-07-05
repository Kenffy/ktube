import { useRef } from "react";
import styles from "../assets/css/components/shortplayercard.module.css";
import useElementOnScreen from "../hooks/useElementOnScreen";
import { ScrollOption } from "../types/types";
import ReactPlayer from "react-player";

type videoProps = {
  video?: any;
};

export const ShortPlayerCrad = ({ video }: videoProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const options: ScrollOption = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, wrapperRef);

  return (
    <div className={styles.playerWrapper} ref={wrapperRef}>
      <ReactPlayer
        height="100%"
        width="100%"
        controls
        url={video?.videoUrl}
        playing={isVisibile}
        autoPlay={isVisibile}
        ref={playerRef}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
          facebook: {
            appId: "12345",
          },
        }}
      />
      <div className={styles.rightWrapper}>
        <div className={styles.rightItem}>
          <div className={styles.rightIcon}>
            <i className="fa-regular fa-heart"></i>
          </div>
          <span>{video?.likes.length}</span>
        </div>

        <div className={styles.rightItem}>
          <div className={styles.rightIcon}>
            <i className="fa-solid fa-comment"></i>
          </div>
          <span>{video?.comments.length}</span>
        </div>

        <div className={styles.rightItem}>
          <div className={styles.rightIcon}>
            <i className="fa-solid fa-share"></i>
          </div>
          <span>share</span>
        </div>

        <div className={styles.rightItem}>
          <div className={styles.rightIcon}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
          <span></span>
        </div>
      </div>
      <div className={styles.bottomWrapper}>
        <p className={styles.title}>{video.title}</p>
        <div className={styles.actionWrapper}>
          <div className={styles.userWrapper}>
            <img src={video.profile} alt={video?.username} />
            <span>{video?.username}</span>
            <span className={styles.connections}>{video?.views} views</span>
          </div>
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};
