import { useContext, useEffect, useState } from "react";
import styles from "../assets/css/pages/home.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { getVideos } from "../services/services";
import { IVideo } from "../types/types";
import { useDispatch } from "react-redux";
import {
  fetchAllShortsSuccess,
  fetchAllVideoSuccess,
} from "../redux/videoSlice";
import { VideoSKCard } from "../components/VideoSKCard";
import { ShortSKCard } from "../components/ShortSKCard";

type homeProps = {
  type: string;
};
export const Home = ({ type }: homeProps) => {
  const dispatch = useDispatch();
  const { state } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [shorts, setShorts] = useState<IVideo[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const l_type = type === "random" ? "" : type;
        const videoRes = await getVideos(l_type);
        if (videoRes.status === 200) {
          if (type === "random") {
            setVideos(videoRes.data.videos);
            setShorts(videoRes.data.shorts);
            dispatch(fetchAllVideoSuccess(videoRes.data.videos));
            dispatch(fetchAllShortsSuccess(videoRes.data.shorts));
          } else {
            setVideos(videoRes.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    type && loadVideos();
  }, [type, dispatch]);

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.wrapper}>
        <Header />
        {videos?.length > 0 ? (
          <div className={styles.videoWrapper}>
            {videos.map((video) => (
              <VideoCard key={video?._id} video={video} />
            ))}
          </div>
        ) : (
          <div className={styles.videoWrapper}>
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
          </div>
        )}

        <hr />
        {shorts?.length > 0 ? (
          <div className={styles.shortWrapper}>
            {shorts.map((video) => (
              <ShortCard key={video?._id} video={video} />
            ))}
          </div>
        ) : (
          <div className={styles.shortWrapper}>
            <ShortSKCard />
            <ShortSKCard />
            <ShortSKCard />
            <ShortSKCard />
            <ShortSKCard />
            <ShortSKCard />
            <ShortSKCard />
            <ShortSKCard />
          </div>
        )}
        <hr />
        {videos?.length > 0 ? (
          <div className={styles.videoWrapper}>
            {videos.map((video) => (
              <VideoCard key={video?._id} video={video} />
            ))}
          </div>
        ) : (
          <div className={styles.videoWrapper}>
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
            <VideoSKCard />
          </div>
        )}
      </div>
    </div>
  );
};
