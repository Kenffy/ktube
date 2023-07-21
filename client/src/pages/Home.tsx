import { useContext, useEffect, useState } from "react";
import styles from "../assets/css/pages/home.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { getVideos } from "../services/services";
import { StateProps } from "../types/types";
import { useSelector } from "react-redux";
import { VideoSKCard } from "../components/VideoSKCard";
import { ShortSKCard } from "../components/ShortSKCard";

type homeProps = {
  type: string;
};
export const Home = ({ type }: homeProps) => {
  const { state } = useContext(ThemeContext);
  const { shorts, videos } = useSelector((state: StateProps) => state.video);
  const theme = state.theme === "light" ? styles.light : styles.dark;

  const nSkeleton = 10;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<any[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      try {
        const res = await getVideos(type === "random" ? "" : type);
        if (res.status === 200) {
          setVideoData(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    type && loadVideos();
  }, [type]);

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.wrapper}>
        <Header />
        {!isLoading && videos?.length > 0 ? (
          <div className={styles.videoWrapper}>
            {videos.map((video) => (
              <VideoCard key={video?._id} video={video} />
            ))}
          </div>
        ) : (
          <div className={styles.videoWrapper}>
            {[...Array(nSkeleton)].map((item, index) => (
              <VideoSKCard key={index} />
            ))}
          </div>
        )}

        {!isLoading && shorts?.length > 0 ? (
          <>
            {shorts.length > 0 && (
              <>
                <hr />
                <div className={styles.shortWrapper}>
                  {shorts.map((video) => (
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
              {[...Array(nSkeleton)].map((item, index) => (
                <ShortSKCard key={index} />
              ))}
            </div>
          </>
        )}

        {!isLoading && videoData?.length > 0 ? (
          <>
            {videoData.length > 0 && (
              <>
                <hr />
                <div className={styles.videoWrapper}>
                  {videoData.map((video) => (
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
              {[...Array(nSkeleton)].map((item, index) => (
                <VideoSKCard key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
