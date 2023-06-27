import styles from "../assets/css/pages/single.module.css";
import { VideoCard } from "../components/VideoCard";
import ReactPlayer from "react-player";
import { VideoComments } from "../components/VideoComments";
import { useState } from "react";

export const Single = () => {
  const [onMore, setOnMore] = useState<Boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.player}>
            <ReactPlayer
              height="100%"
              width="100%"
              controls
              url={`https://www.youtube.com/watch?v=TX9qSaGXFyg`}
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
          <h4 className={styles.title}>
            Drogues : labos et trafiquants partagent le magot - Politique & Eco
            n°394 avec Michel Gandilhon
          </h4>
          <div className={styles.detailWrapper}>
            <div className={styles.detailLeft}>
              <span className={styles.views}>4325 views • 2 weeks ago</span>
            </div>
            <div className={styles.detailRight}>
              <div className={`${styles.actionItem} ${styles.like}`}>
                <i className="fa-regular fa-thumbs-up"></i>
                <span>532</span>
              </div>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-share"></i>
              </div>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.profileWrapper}>
              <img
                src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
                alt=""
                className={styles.profile}
              />
              <div className={styles.infoWrapper}>
                <span className={styles.channel}>Chaîne officielle TVL</span>
                <span className={styles.connections}>5230 Subscribers</span>
              </div>
            </div>
            <button className={styles.subscribeBtn}>Subscribe</button>
          </div>
          <div className={`${styles.descWrapper} ${onMore && styles.full}`}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad nisi
              amet totam iure beatae? Nihil, quis est fugiat molestiae
              repellendus officiis accusamus sequi qui incidunt dolorem
              voluptates dolore vero voluptatem!
            </p>
            <span
              onClick={() => setOnMore((prev) => !prev)}
              className={styles.moreComments}
            >
              {onMore ? "show less" : "show more"}
            </span>
          </div>

          <VideoComments />
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
