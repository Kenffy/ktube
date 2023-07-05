import styles from "../assets/css/pages/short.module.css";
//import { shortVideos } from "../seeds/shortData";
import { ShortPlayerCrad } from "../components/ShortPlayerCrad";
import { useEffect, useState } from "react";
import { IVideo } from "../types/types";
import { useDispatch } from "react-redux";
import { getShorts } from "../services/services";

type shortProps = {
  type: string;
};

export const Short = ({ type }: shortProps) => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      //dispatch(fetchStart());
      try {
        const res = await getShorts(type);
        if (res.status === 200) {
          setVideos(res.data);
          //dispatch(fetchAllVideoSuccess(res.data));
        }
      } catch (error) {
        console.log(error);
        //dispatch(fetchFailure());
      }
    };

    loadVideos();
  }, [type, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {videos.map((shVideo) => (
          <ShortPlayerCrad key={shVideo._id} video={shVideo} />
        ))}
      </div>
    </div>
  );
};
