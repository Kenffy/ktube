import styles from "../assets/css/pages/single.module.css";
import { VideoCard } from "../components/VideoCard";
import ReactPlayer from "react-player";
import { VideoComments } from "../components/VideoComments";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  dislikeVideo,
  getVideo,
  likeVideo,
  subscribe,
  unsubscribe,
} from "../services/services";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../types/types";
import { format } from "timeago.js";
import parse from "html-react-parser";
import avatar from "../assets/images/avatar.png";
import { ScrollToTop } from "../components/ScrollToTop";
import { AddVideo } from "./AddVideo";
import {
  dislike,
  fetchFailure,
  fetchStart,
  fetchVideoSuccess,
  like,
} from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";

export const Single = () => {
  const route = useParams();
  const videoId = route.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [onMore, setOnMore] = useState<Boolean>(false);
  const [onEdit, setOnEdit] = useState<Boolean>(false);
  const { videos, currentVideo } = useSelector(
    (state: StateProps) => state.video
  );
  const { authUser, currentUser } = useSelector(
    (state: StateProps) => state.user
  );

  const isFriend =
    (currentVideo?.userId !== currentUser?._id &&
      currentUser?.subscriptions.includes(currentVideo?.userId)) ||
    false;

  useEffect(() => {
    const loadVideo = async () => {
      dispatch(fetchStart());
      try {
        const res = await getVideo(videoId);
        if (res.status === 200) {
          dispatch(fetchVideoSuccess(res.data));
        }
      } catch (error) {
        dispatch(fetchFailure());
        console.log(error);
      }
    };
    videoId && loadVideo();
  }, [videoId, dispatch]);

  const handleOnProfile = () => {
    navigate(`/channel/${currentVideo?.userId}`);
  };

  const handleOnEdit = () => {
    setOnEdit(true);
  };

  const handleLike = async () => {
    try {
      if (currentVideo?.likes?.includes(currentUser?._id)) {
        await dislikeVideo(currentVideo?._id, authUser?.accessToken);
        dispatch(dislike(currentUser?._id));
      } else {
        await likeVideo(currentVideo?._id, authUser?.accessToken);
        dispatch(like(currentUser?._id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDislike = async () => {
  //   try {
  //     await dislikeVideo(currentVideo?._id, authUser?.accessToken);
  //     dispatch(dislike(currentUser?._id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubscribe = async () => {
    if (currentUser?._id === currentVideo?.userId) {
      console.log("You can't subscribe to your own channel.");
      return;
    }
    try {
      isFriend
        ? await unsubscribe(currentVideo?.userId, authUser?.accessToken)
        : await subscribe(currentVideo?.userId, authUser?.accessToken);
      dispatch(subscription(currentVideo?.userId));
    } catch (error) {}
  };

  return (
    <>
      {onEdit ? (
        <AddVideo upsertVideo={currentVideo} setOnEdit={setOnEdit} />
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
                  url={currentVideo?.videoUrl}
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
                <h4 className={styles.title}>{currentVideo?.title}</h4>
                {currentVideo?.userId === currentUser?._id && (
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
                    {`${currentVideo?.views} views • ${format(
                      currentVideo?.createdAt
                    )}`}
                  </span>
                </div>
                <div className={styles.detailRight}>
                  <div
                    onClick={handleLike}
                    className={`${styles.actionItem} ${styles.like}`}
                  >
                    <i
                      className={
                        currentVideo?.likes?.includes(currentUser?._id)
                          ? "fa-solid fa-heart"
                          : "fa-regular fa-heart"
                      }
                    ></i>
                    <span>{currentVideo?.likes?.length}</span>
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
                    src={currentVideo?.profile || avatar}
                    alt={currentVideo?.username}
                    className={styles.profile}
                  />
                  <div className={styles.infoWrapper}>
                    <span onClick={handleOnProfile} className={styles.channel}>
                      {currentVideo?.username}
                    </span>
                    <span className={styles.connections}>
                      {currentVideo?.subscribers?.length} subscribers
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSubscribe}
                  className={styles.subscribeBtn}
                >
                  {isFriend ? "subscribed" : "subscribe"}
                </button>
              </div>
              <div className={`${styles.descWrapper} ${onMore && styles.full}`}>
                <div className={styles.description}>
                  {parse(currentVideo?.desc || "")}
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
