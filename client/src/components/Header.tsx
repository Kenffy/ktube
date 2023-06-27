import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperType, Autoplay, Pagination } from "swiper";

import styles from "../assets/css/components/header.module.css";
import { useRef } from "react";
import { FeaturedCard } from "./FeaturedCard";

export const Header = () => {
  SwiperCore.use([Autoplay]);
  const delay = 5000;
  const speed = 1000;
  const swiperRef = useRef<SwiperType>();

  return (
    <div className={styles.container}>
      <Swiper
        loop={true}
        autoplay={{
          delay: delay,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={speed}
        navigation={false}
        pagination={false}
        modules={[Pagination]}
        slidesPerView={1}
        className={styles.swiperWrapper}
      >
        <SwiperSlide>
          <FeaturedCard />
        </SwiperSlide>
        <SwiperSlide>
          <FeaturedCard />
        </SwiperSlide>
        <SwiperSlide>
          <FeaturedCard />
        </SwiperSlide>
        <SwiperSlide>
          <FeaturedCard />
        </SwiperSlide>
      </Swiper>
      <div className={styles.actionWrapper}>
        <button
          className={styles.leftArrow}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className={styles.rightArrow}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
