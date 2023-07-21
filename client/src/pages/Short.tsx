import styles from "../assets/css/pages/short.module.css";
import { ShortPlayerCrad } from "../components/ShortPlayerCrad";
import { useEffect } from "react";
import { StateProps } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../services/services";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchFailure,
  fetchShortSuccess,
  fetchStart,
} from "../redux/videoSlice";

type shortProps = {
  type: string;
};

export const Short = ({ type }: shortProps) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { shorts } = useSelector((state: StateProps) => state.video);
  const shortId = params?.id;

  useEffect(() => {
    const loadVideo = async () => {
      dispatch(fetchStart());
      try {
        const res = await getVideo(shortId);
        if (res.status === 200) {
          dispatch(fetchShortSuccess(res.data));
        }
      } catch (error) {
        dispatch(fetchFailure());
        console.log(error);
      }
    };

    type === "select" && shortId && loadVideo();
  }, [type, shortId, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.backBtn} onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className={styles.wrapper}>
        {shorts.map((short) => (
          <ShortPlayerCrad key={short?._id} video={short} />
        ))}
      </div>
    </div>
  );
};
