import styles from "../assets/css/pages/single.module.css";
import { VideoCard } from "../components/VideoCard";
import ReactPlayer from "react-player";
import { VideoComments } from "../components/VideoComments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideo } from "../services/services";
import { useSelector } from "react-redux";
import { StateProps } from "../types/types";
import { format } from "timeago.js";
import parse from "html-react-parser";
import avatar from "../assets/images/avatar.png";

export const Single = () => {
  const route = useParams();

  const [video, setVideo] = useState<any>({});
  const [onMore, setOnMore] = useState<Boolean>(false);
  const { videos } = useSelector((state: StateProps) => state.video);
  const { currentUser } = useSelector((state: StateProps) => state.user);

  const isFriend =
    (video?.userId !== currentUser?._id &&
      currentUser?.subscriptions.includes(video?.userId)) ||
    false;

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const res = await getVideo(route.id);
        if (res.status === 200) {
          setVideo(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (route.id !== "test") {
      loadVideo();
    } else {
      setVideo({
        title: `Drogues : labos et trafiquants partagent le magot - Politique & Eco
        n°394 avec Michel Gandilhon`,
        videoUrl: `https://www.youtube.com/watch?v=TX9qSaGXFyg`,
      });
    }
  }, [route.id]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.player}>
            <ReactPlayer
              height="100%"
              width="100%"
              controls
              url={video?.videoUrl}
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
          <h4 className={styles.title}>{video?.title}</h4>
          <div className={styles.detailWrapper}>
            <div className={styles.detailLeft}>
              <span className={styles.views}>
                {`${video?.views} views • ${format(video?.createdAt)}`}
              </span>
            </div>
            <div className={styles.detailRight}>
              <div className={`${styles.actionItem} ${styles.like}`}>
                <i className="fa-regular fa-heart"></i>
                <span>{video?.likes?.length}</span>
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
                src={video?.profile || avatar}
                alt={video?.username}
                className={styles.profile}
              />
              <div className={styles.infoWrapper}>
                <span className={styles.channel}>{video?.username}</span>
                <span className={styles.connections}>
                  {video?.subscribers?.length} subscribers
                </span>
              </div>
            </div>
            <button className={styles.subscribeBtn}>
              {isFriend ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className={`${styles.descWrapper} ${onMore && styles.full}`}>
            <div className={styles.description}>{parse(video?.desc || "")}</div>
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
            {videos.map((item) => (
              <VideoCard key={item?._id} video={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
