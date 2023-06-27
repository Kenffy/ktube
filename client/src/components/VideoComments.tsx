import { useRef } from "react";
import styles from "../assets/css/components/comments.module.css";

export const VideoComments = () => {
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentRef.current) {
      commentRef.current.value = "";
    }
  };

  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("commented: ", commentRef.current?.value);
    if (commentRef.current) {
      commentRef.current.value = "";
    }
  };
  return (
    <div className={styles.container}>
      <span>3 Comments</span>
      <form className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <img
            src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
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

      <div className={styles.commentList}>
        <div className={styles.commentItem}>
          <div className={styles.commentUserInfos}>
            <img
              src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
              alt=""
            />
            <span>Chaîne officielle TVL • 3 days ago</span>
          </div>
          <div className={styles.commentBody}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident quasi quos cum sapiente hic deserunt nihil eius illum
              quidem harum?
            </p>
          </div>
          <div className={styles.commentActions}>
            <div className={`${styles.commentActionItem} ${styles.like}`}>
              <i className="fa-regular fa-thumbs-up"></i>
              <span>25</span>
            </div>
            <div className={styles.commentActionItem}>
              <i className="fa-solid fa-share"></i>
            </div>
            <div className={styles.commentActionItem}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>

        <div className={styles.commentItem}>
          <div className={styles.commentUserInfos}>
            <img
              src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
              alt=""
            />
            <span>Chaîne officielle TVL • 3 days ago</span>
          </div>
          <div className={styles.commentBody}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident quasi quos cum sapiente hic deserunt nihil eius illum
              quidem harum?
            </p>
          </div>
          <div className={styles.commentActions}>
            <div className={`${styles.commentActionItem} ${styles.like}`}>
              <i className="fa-regular fa-thumbs-up"></i>
              <span>25</span>
            </div>
            <div className={styles.commentActionItem}>
              <i className="fa-solid fa-share"></i>
            </div>
            <div className={styles.commentActionItem}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>

        <div className={styles.commentItem}>
          <div className={styles.commentUserInfos}>
            <img
              src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
              alt=""
            />
            <span>Chaîne officielle TVL • 3 days ago</span>
          </div>
          <div className={styles.commentBody}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident quasi quos cum sapiente hic deserunt nihil eius illum
              quidem harum?
            </p>
          </div>
          <div className={styles.commentActions}>
            <div className={`${styles.commentActionItem} ${styles.like}`}>
              <i className="fa-regular fa-thumbs-up"></i>
              <span>25</span>
            </div>
            <div className={styles.commentActionItem}>
              <i className="fa-solid fa-share"></i>
            </div>
            <div className={styles.commentActionItem}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>
      </div>

      <span className={styles.moreComments}>show more</span>
    </div>
  );
};
