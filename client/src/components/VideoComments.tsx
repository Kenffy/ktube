import { useEffect, useRef, useState } from "react";
import styles from "../assets/css/components/comments.module.css";
import avatar from "../assets/images/avatar.png";
import {
  createComment,
  dislikeComment,
  getCommentByVideoId,
  likeComment,
} from "../services/services";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";

type commentProps = {
  videoId: string;
  user: any;
};
export const VideoComments = ({ videoId, user }: commentProps) => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const [comments, setComments] = useState<any[]>([]);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleOnProfile = (channelId: string) => {
    navigate(`/channel/${channelId}`);
  };

  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await getCommentByVideoId(videoId);
        if (res.data) {
          setComments(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    videoId && loadComments();
  }, [videoId]);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentRef.current) {
      commentRef.current.value = "";
    }
  };

  const handleLike = async (comment: any) => {
    try {
      if (comment?.likes?.includes(user?.id)) {
        await dislikeComment(comment?._id, user?.accessToken);
        comment?.likes?.filter((id: string) => id !== user?.id);
        const updatedComment = {
          ...comment,
          likes: comment?.likes?.filter((id: string) => id !== user?.id),
        };
        setComments((prev) => [
          ...prev.map((com) =>
            com?._id === updatedComment?._id ? updatedComment : com
          ),
        ]);
        //dispatch(dislike(user?._id));
      } else {
        await likeComment(comment?._id, user?.accessToken);
        comment?.likes?.push(user?.id);
        setComments((prev) => [
          ...prev.map((com) => (com?._id === comment?._id ? comment : com)),
        ]);
        //dispatch(like(user?._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentRef.current) {
      if (commentRef.current.value === "") return;
      const comment = {
        videoId,
        desc: commentRef.current.value,
      };

      try {
        const res = await createComment(comment, user.accessToken);
        if (res.data) {
          setComments((prev) => [...prev, res.data]);
        }
      } catch (error) {
        console.log(error);
      }
      commentRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <span>
        {comments?.length > 1
          ? `${comments?.length} Comments`
          : `${comments?.length} Comment`}
      </span>
      <form className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <img
            src={user?.profile || avatar}
            alt=""
            className={styles.commentUser}
          />
          <textarea
            required
            ref={commentRef}
            placeholder="Enter your comment"
          ></textarea>
        </div>
        <div className={styles.inputActions}>
          <button onClick={handleCancel}>Cancel</button>
          <button type="submit" onClick={handleComment}>
            Comment
          </button>
        </div>
      </form>

      {comments.length > 0 && (
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <div className={styles.commentItem} key={comment?._id}>
              <div className={styles.commentUserInfos}>
                <img
                  src={comment?.profile || avatar}
                  alt=""
                  onClick={() => handleOnProfile(comment?.userId)}
                />
                <div className="userInfoWrapper">
                  <span
                    className={styles.channel}
                    onClick={() => handleOnProfile(comment?.userId)}
                  >
                    {comment?.username}
                  </span>
                  •
                  <span className={styles.timeline}>
                    {format(comment?.createdAt)}
                  </span>
                </div>
              </div>
              <div className={styles.commentBody}>
                <p>{comment?.desc}</p>
              </div>
              <div className={styles.commentActions}>
                <div
                  onClick={() => handleLike(comment)}
                  className={`${styles.commentActionItem} ${styles.like}`}
                >
                  <i
                    className={
                      comment?.likes?.includes(user?.id)
                        ? "fa-solid fa-heart"
                        : "fa-regular fa-heart"
                    }
                  ></i>
                  <span>{comment?.likes?.length}</span>
                </div>
                <div className={styles.commentActionItem}>
                  <i className="fa-solid fa-share"></i>
                </div>
                <div className={styles.commentActionItem}>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <span className={styles.moreComments}>show more</span>
    </div>
  );
};
