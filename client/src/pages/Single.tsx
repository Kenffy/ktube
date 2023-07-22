import styles from "../assets/css/pages/single.module.css";
import { VideoCard } from "../components/VideoCard";
import ReactPlayer from "react-player";
import { VideoComments } from "../components/VideoComments";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVideo } from "../services/services";
import { useSelector } from "react-redux";
import { StateProps } from "../types/types";
import { format } from "timeago.js";
import parse from "html-react-parser";
import avatar from "../assets/images/avatar.png";
import { ScrollToTop } from "../components/ScrollToTop";
import { AddVideo } from "./AddVideo";

export const Single = () => {
  const route = useParams();
  const videoId = route.id;
  const navigate = useNavigate();

  const [video, setVideo] = useState<any>({});
  const [onMore, setOnMore] = useState<Boolean>(false);
  const [onEdit, setOnEdit] = useState<Boolean>(false);
  const { videos } = useSelector((state: StateProps) => state.video);
  const { authUser, currentUser } = useSelector(
    (state: StateProps) => state.user
  );

  const isFriend =
    (video?.userId !== currentUser?._id &&
      currentUser?.subscriptions.includes(video?.userId)) ||
    false;

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const res = await getVideo(videoId);
        if (res.status === 200) {
          setVideo(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    videoId && loadVideo();
  }, [videoId]);

  const handleOnProfile = () => {
    navigate(`/channel/${video?.userId}`);
  };

  const handleOnEdit = () => {
    setOnEdit(true);
  };

  return (
    <>
      {onEdit ? (
        <AddVideo
          upsertVideo={video}
          setUpdatedVideo={setVideo}
          setOnEdit={setOnEdit}
        />
      ) : (
        <div className={styles.container}>
          <ScrollToTop />
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
              <div className={styles.titleWrapper}>
                <h4 className={styles.title}>{video?.title}</h4>
                {video?.userId === currentUser?._id && (
                  <div className={styles.titleActions}>
                    <div
                      onClick={handleOnEdit}
                      className={styles.titleActionItem}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className={styles.titleActionItem}>
                      <i className="fa-solid fa-trash-can"></i>
                    </div>
                  </div>
                )}
              </div>

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
                    onClick={handleOnProfile}
                    src={video?.profile || avatar}
                    alt={video?.username}
                    className={styles.profile}
                  />
                  <div className={styles.infoWrapper}>
                    <span onClick={handleOnProfile} className={styles.channel}>
                      {video?.username}
                    </span>
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
                <div className={styles.description}>
                  {parse(video?.desc || "")}
                </div>
                <span
                  onClick={() => setOnMore((prev) => !prev)}
                  className={styles.moreComments}
                >
                  {onMore ? "show less" : "show more"}
                </span>
              </div>

              <VideoComments videoId={videoId || ""} user={authUser} />
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
      )}
    </>
  );
};
