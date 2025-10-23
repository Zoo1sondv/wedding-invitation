import React from "react";
import style from "./videoSection.module.scss";

const VideoSection = ({ sectionRef, showSection }) => {
  return (
    <section
      ref={sectionRef}
      className={`${style.videoSection} ${showSection ? style.show : ""}`}
    >
      <div className={style.videoSection__container}>
        <div className={style.videoSection__content}>
          <div className={style.videoSection__header}>
            <h2>Lễ Cưới Hôn Phối Trong Nhà Thờ</h2>
            <p>Hãy cùng chúng tôi xem lại những khoảnh khắc thiêng liêng và tuyệt đẹp trong ngày trọng đại của chúng tôi</p>
          </div>
          
          <div className={style.videoSection__videoContainer}>
            <div className={style.videoSection__videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/gZsGz2qaWzg"
                title="Lễ Cưới Hôn Phối Trong Nhà Thờ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={style.videoSection__iframe}
              ></iframe>
            </div>
          </div>

          <div className={style.videoSection__description}>
            <p>
              💒 Cảm ơn tất cả những người thân yêu đã có mặt trong ngày trọng đại của chúng tôi. 
              Những khoảnh khắc thiêng liêng này sẽ mãi là kỷ niệm đẹp nhất trong cuộc đời chúng tôi.
            </p>
            <div className={style.videoSection__cta}>
              <a 
                href="https://www.youtube.com/watch?v=gZsGz2qaWzg" 
                target="_blank" 
                rel="noopener noreferrer"
                className={style.videoSection__ytButton}
              >
                🎥 Xem trên YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;