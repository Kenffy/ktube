import { useContext, useState } from "react";
import styles from "../assets/css/pages/channel.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { PlaylistCard } from "../components/PlaylistCard";
import { AddPlayList } from "../components/AddPlayList";

export const Channel = () => {
  const { state } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [onMenu, setOnMenu] = useState<boolean>(false);
  const [onCreateList, setOnCreateList] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isOwner, setIsOwner] = useState(false);

  const profileUrl =
    "https://firebasestorage.googleapis.com/v0/b/kenffy-blog.appspot.com/o/images%2Fusers%2FWUMkcZvtLdP17odhWejXsN2Pg5a2%2Fprofile%2F4e66a164-f2f4-45d7-92c0-c9cd20a3ea17kenffy.jpeg?alt=media&token=a711b3b9-4dc6-410d-bbe9-9ad5a6b54c96";

  const bannerUrl = "https://www.vyasgroup.com/images/business/sci-com.jpg";

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
          <img src={profileUrl} alt="" className={styles.profile} />
          <div className={styles.userDesc}>
            <div className={styles.userTop}>
              <span className={styles.channel}>Channel Name</span>
              <button
                onClick={() => setIsOwner((prev) => !prev)}
                className={styles.subscribeBtn}
              >
                {isOwner ? "Edit Profile" : "Subscribe"}
              </button>
            </div>
            <div className={styles.userBotton}>
              {/* <span className={styles.alias}>@ChannelName</span> */}
              <span className={styles.subscribers}>180 Subscribers</span>
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
            <div className={styles.videoWrapper}>
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
            </div>
          )}
          {tabIndex === 1 && (
            <div className={styles.shortWrapper}>
              <ShortCard />
              <ShortCard />
              <ShortCard />
              <ShortCard />
              <ShortCard />
              <ShortCard />
              <ShortCard />
              <ShortCard />
            </div>
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
