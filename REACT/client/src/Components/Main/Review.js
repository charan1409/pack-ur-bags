import React from "react";
import ReviewComp from "./ReviewComp";
import { Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import img1 from "./img/pic1.png";
import img2 from "./img/pic2.png";
import img3 from "./img/pic3.png";
import img4 from "./img/pic4.png";

import "swiper/css";

const Review = () => {
  SwiperCore.use([Autoplay]);
  return (
    <div className="section">
      <div className="review" id="review">
        <h1 className="heading">
          <span>R</span>
          <span>E</span>
          <span>V</span>
          <span>I</span>
          <span>E</span>
          <span>W</span>
        </h1>

        <Swiper
          autoplay={{ delay: 3000 }}
          className="review-slider"
          style={{ height: "55%" }}
          modules={[Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <ReviewComp
              link={img1}
              name="Jennifer"
              data="Excellent! Very good service from beginning to end. Even with a
                COVID-related delay in the middle of it, Lisa stayed in contact
                with us and got us a reschedule with the utmost of ease. Thank
                you!"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewComp
              link={img2}
              name="Ann Gordon"
              data="I usually plan and book our holidays myself and was a little
                cautious but thought I'd give booking with PACK UR BAGS a go.
                Booking with PACK UR BAGS was easy and trouble free. My
                consultant and other staff were very helpful and friendly."
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewComp
              link={img3}
              name="Stacey Vorwerk"
              data="Super happy with travel online. Hotel was quite disappointing
              peobably wont stay there again to be honest"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewComp
              link={img4}
              name="Leanne Celik"
              data="Website is very user friendly, easy to navigate and play around
              with dates and different options. When having to make contact
              with womeone, service was very good and accommodated our
              requests. Thank You!"
            />
          </SwiperSlide>
        </Swiper>

        {/* <div className="swiper-pagination"></div> */}
      </div>
    </div>
  );
};

export default Review;
