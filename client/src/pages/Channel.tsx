import { useContext, useEffect, useState } from "react";
import styles from "../assets/css/pages/channel.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { PlaylistCard } from "../components/PlaylistCard";
import { AddPlayList } from "../components/AddPlayList";
import { useSelector } from "react-redux";
import { IVideo, StateProps } from "../types/types";
import { getShortsByUserId, getVideosByUserId } from "../services/services";
import avatar from "../assets/images/avatar.png";

export const Channel = () => {
  const { state } = useContext(ThemeContext);
  const navigate = useNavigate();
  const params = useParams();
  const channelId = params?.id;

  const { currentUser } = useSelector((state: StateProps) => state.user);

  const [onMenu, setOnMenu] = useState<boolean>(false);
  const [onCreateList, setOnCreateList] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isOwner, setIsOwner] = useState(
    channelId === currentUser?._id ? true : false
  );
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [shorts, setShorts] = useState<IVideo[]>([]);

  const bannerUrl = "https://www.vyasgroup.com/images/business/sci-com.jpg";

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videoRes = await getVideosByUserId(channelId);
        const shortRes = await getShortsByUserId(channelId);
        if (videoRes.status === 200) {
          setVideos(videoRes.data);
        }
        if (shortRes.status === 200) {
          setShorts(shortRes.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    channelId && loadVideos();
  }, [channelId]);

  const handleAddVideo = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    navigate("/videos/create");
  };

  const handleAddShort = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOnMenu(false);
    navigate("/shorts/create");
  };

  const theme = state.theme === "light" ? styles.light : styles.dark;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <img src={bannerUrl} alt="" />
        </div>
        <div className={styles.userWrapper}>
          <img
            src={currentUser?.profile || avatar}
            alt={currentUser?.username}
            className={styles.profile}
          />
          <div className={styles.userDesc}>
            <div className={styles.userTop}>
              <span className={styles.channel}>{currentUser?.username}</span>
              <button
                onClick={() => setIsOwner((prev) => !prev)}
                className={styles.subscribeBtn}
              >
                {isOwner ? "Edit Profile" : "Subscribe"}
              </button>
            </div>
            <div className={styles.userBotton}>
              {/* <span className={styles.alias}>@ChannelName</span> */}
              <span
                className={styles.subscribers}
              >{`${currentUser?.subscribers.length} subscribers`}</span>
            </div>
          </div>
        </div>

        <div className={styles.tabWrapper}>
          <div
            onClick={() => setTabIndex(0)}
            className={`${styles.tabItem} ${tabIndex === 0 && styles.active}`}
          >
            <span>Videos</span>
          </div>
          <div
            onClick={() => setTabIndex(1)}
            className={`${styles.tabItem} ${tabIndex === 1 && styles.active}`}
          >
            <span>Shorts</span>
          </div>
          <div
            onClick={() => setTabIndex(2)}
            className={`${styles.tabItem} ${tabIndex === 2 && styles.active}`}
          >
            <span>Playlists</span>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          {tabIndex === 0 && (
            <>
              {videos.length > 0 ? (
                <div className={styles.videoWrapper}>
                  {videos.map((video) => (
                    <VideoCard key={video?._id} video={video} />
                  ))}
                </div>
              ) : (
                <div className={styles.notifyWrapper}>
                  <span>Sorry! No videos found.</span>
                </div>
              )}
            </>
          )}
          {tabIndex === 1 && (
            <>
              {shorts.length > 0 ? (
                <div className={styles.shortWrapper}>
                  {shorts.map((video) => (
                    <ShortCard key={video?._id} video={video} />
                  ))}
                </div>
              ) : (
                <div className={styles.notifyWrapper}>
                  <span>Sorry! No shorts found.</span>
                </div>
              )}
            </>
          )}
          {tabIndex === 2 && (
            <div className={styles.playlistWrapper}>
              <PlaylistCard />
              <PlaylistCard />
              <PlaylistCard />
              <PlaylistCard />
              <PlaylistCard />
              <PlaylistCard />
            </div>
          )}
        </div>
      </div>
      <AddPlayList open={onCreateList} setOpen={setOnCreateList} />
      <div className={styles.addBtnWrapper}>
        <button
          onClick={() => setOnMenu((prev) => !prev)}
          className={`${styles.addBtn} ${theme}`}
        >
          <i className={`fa-solid fa-plus ${onMenu && styles.active}`}></i>
        </button>
        <div
          className={`${styles.addBtnMenu} ${theme} ${onMenu && styles.active}`}
        >
          <span onClick={handleAddVideo}>
            <i className="fa-solid fa-video"></i>
            <small>Video</small>
          </span>
          <span onClick={handleAddShort}>
            <i className="fa-solid fa-mobile"></i>
            <small>Short</small>
          </span>

          <span
            onClick={() => {
              setOnMenu(false);
              setOnCreateList(true);
            }}
          >
            <i className="fa-solid fa-list-ul"></i>
            <small>Playlist</small>
          </span>
        </div>
      </div>
    </div>
  );
};
