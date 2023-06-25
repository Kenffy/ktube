import styles from "../assets/css/pages/single.module.css";
import { VideoCard } from "../components/VideoCard";
import ReactPlayer from "react-player";

export const Single = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          {/* <video
            controls
            className={styles.player}
            src="https://www.youtube.com/watch?v=Qu1OBfCRQys"
          ></video> */}
          <ReactPlayer
            className={styles.player}
            url={`https://www.youtube.com/watch?v=Qu1OBfCRQys`}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
              facebook: {
                appId: "12345",
              },
            }}
          />
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.videoWrapper}>
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
          </div>
        </div>
      </div>
    </div>
  );
};
