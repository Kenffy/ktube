import styles from "../assets/css/components/featuredcard.module.css";

export const FeaturedCard = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://img.freepik.com/vektoren-kostenlos/stilvolles-leuchtendes-digitales-rotes-linienbanner_1017-23964.jpg"
        alt=""
        className={styles.cover}
      />
      <div className={styles.brands}>
        <h2>Your videos, your community, your stage.</h2>
        <h4>Where videos bring people together.</h4>
      </div>
    </div>
  );
};
