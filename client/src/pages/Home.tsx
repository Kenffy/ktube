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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let l_videosFirst = videos.slice(0, 9);
  let l_videosSecond = videos.slice(10, 19);
  let l_videosThird = videos.slice(20, videos?.length);
  let l_shortsFirst = shorts.slice(0, 9);
  let l_shortsSecond = shorts.slice(10, 19);

  const nvideoSk = 10;
  const nshortSk = 10;

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
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
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    type && loadVideos();
  }, [type, dispatch]);

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.wrapper}>
        <Header />
        {!isLoading ? (
          <div className={styles.videoWrapper}>
            {l_videosFirst.map((video) => (
              <VideoCard key={video?._id} video={video} />
            ))}
          </div>
        ) : (
          <div className={styles.videoWrapper}>
            {[...Array(nvideoSk)].map((item, index) => (
              <VideoSKCard key={index} />
            ))}
          </div>
        )}

        {!isLoading ? (
          <>
            {l_shortsFirst.length > 0 && (
              <>
                <hr />
                <div className={styles.shortWrapper}>
                  {l_shortsFirst.map((video) => (
                    <ShortCard key={video?._id} video={video} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <hr />
            <div className={styles.shortWrapper}>
              {[...Array(nshortSk)].map((item, index) => (
                <ShortSKCard key={index} />
              ))}
            </div>
          </>
        )}

        {!isLoading ? (
          <>
            {l_videosSecond.length > 0 && (
              <>
                <hr />
                <div className={styles.videoWrapper}>
                  {l_videosSecond.map((video) => (
                    <VideoCard key={video?._id} video={video} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <hr />
            <div className={styles.videoWrapper}>
              {[...Array(nvideoSk)].map((item, index) => (
                <VideoSKCard key={index} />
              ))}
            </div>
          </>
        )}

        {!isLoading ? (
          <>
            {l_shortsSecond.length > 0 && (
              <>
                <hr />
                <div className={styles.shortWrapper}>
                  {l_shortsSecond.map((video) => (
                    <ShortCard key={video?._id} video={video} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className={styles.shortWrapper}>
            {[...Array(nshortSk)].map((item, index) => (
              <ShortSKCard key={index} />
            ))}
          </div>
        )}

        {!isLoading ? (
          <>
            {l_videosThird.length > 0 && (
              <>
                <hr />
                <div className={styles.videoWrapper}>
                  {l_videosThird.map((video) => (
                    <VideoCard key={video?._id} video={video} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <hr />
            <div className={styles.videoWrapper}>
              {[...Array(nvideoSk)].map((item, index) => (
                <VideoSKCard key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
