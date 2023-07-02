import { Link } from "react-router-dom";
import styles from "../assets/css/components/unauthcard.module.css";

type UnAuthCardProps = {
  type: string;
  icon: string;
};
export const UnAuthCard = ({ type, icon }: UnAuthCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <i className={icon}></i>
        <span className={styles.type}>{type}</span>
        <p className={styles.infos}>Please sign in to perform this action.</p>
        <Link to="/login">
          <button className={styles.btn}>Sign In</button>
        </Link>
      </div>
    </div>
  );
};
