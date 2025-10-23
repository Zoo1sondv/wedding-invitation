import React, { useState, useEffect } from "react";
import style from "./home.module.scss";
import clsx from "clsx";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Home = () => {
  const [section1Ref, showSection1] = useScrollAnimation({ threshold: 0.3 });
  const [section2Ref, showSection2] = useScrollAnimation({ threshold: 0.3 });
  const [section3Ref, showSection3] = useScrollAnimation({ threshold: 0.3 });
  const [section4Ref, showSection4] = useScrollAnimation({ threshold: 0.3 });
  const [section5Ref, showSection5] = useScrollAnimation({ threshold: 0.3 });
  const [section6Ref, showSection6] = useScrollAnimation({ threshold: 0.3 });
  const [section7Ref, showSection7] = useScrollAnimation({ threshold: 0.3 });

  // Album slider state
  const albumImages = [
    "/assets/img/0F9A0090.jpg",
    "/assets/img/0F9A0112.JPG",
    "/assets/img/0F9A0175.jpg",
    "/assets/img/0F9A0290.jpg",
    "/assets/img/0F9A0386.jpg",
    "/assets/img/0F9A0430.jpg",
    "/assets/img/0F9A0469.jpg",
    "/assets/img/0F9A0530.jpg",
    "/assets/img/0F9A0567.jpg",
    "/assets/img/0F9A0625.jpg",
    "/assets/img/0F9A0754.jpg",
    "/assets/img/0F9A0785.jpg",
    "/assets/img/0F9A0867.jpg",
    "/assets/img/0F9A0912.jpg",
    "/assets/img/0F9A1373.jpg",
    "/assets/img/0F9A1614.jpg",
    "/assets/img/0F9A6199.jpg",
    "/assets/img/0F9A6237.jpg",
    "/assets/img/0F9A6267.jpg",
    "/assets/img/0F9A6312.jpg",
    "/assets/img/0F9A6359.jpg",
    "/assets/img/0F9A6366.jpg",
    "/assets/img/0F9A6438.jpg",
    "/assets/img/0F9A6634.jpg",
    "/assets/img/0F9A6676.jpg",
    "/assets/img/0F9A6688.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Auto slide effect - only run when user hasn't interacted
  useEffect(() => {
    if (isUserInteracted) {
      return; // Don't auto-slide if user has interacted
    }

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, [albumImages.length, isUserInteracted]);

  const handleThumbnailClick = (index) => {
    setIsUserInteracted(true); // Stop auto-slide when user clicks thumbnail
    setCurrentImageIndex(index);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setIsUserInteracted(true); // Stop auto-slide when user navigates
    setCurrentImageIndex((prevIndex) =>
      prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setIsUserInteracted(true); // Stop auto-slide when user navigates
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? albumImages.length - 1 : prevIndex - 1
    );
  };

  // Touch handlers for swipe gestures
  const onTouchStart = (e) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left -> next image
      handleNextImage();
    } else if (isRightSwipe) {
      // Swipe right -> previous image
      handlePrevImage();
    }
  };

  return (
    <div className={style.home}>
      {/* Hero Section */}
      <section id="home" ref={section1Ref}>
        <div className={style.section_1}>
          <img
            className={style.section_1__image}
            src="/assets/img/0F9A1826.JPG"
            alt="Wedding couple"
            loading="eager"
          />
          <div
            className={clsx(style.section_1__content, {
              [style.show]: showSection1,
            })}
          >
            <h1>We get married!</h1>
            <p>
              ĐOÀN SƠN <br />
              NGUYỄN THÙY
            </p>
          </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section id="invitation-letter" ref={section2Ref}>
        <div className={style.section_2}>
          <div
            className={clsx(style.section_2__content, {
              [style.show]: showSection2,
            })}
          >
            <h1>
              THƯ MỜI THAM DỰ LỄ CƯỚI
              <br />
              WEDDING INVITATION
            </h1>
            <div className={style.section_2__content__divider} />
            <h3>
              Trân trọng kính mời đến dự buổi lễ cưới của
              <br />
              We cordially invite you to attend the wedding ceremony of
            </h3>
          </div>

          <div className={style.section_2__images}>
            {/* Groom */}
            <div
              className={clsx(style.person, style.person__groom, {
                [style.show]: showSection2,
              })}
            >
              <div className={style.person__name}>
                <p>Chú Rể</p>
                ĐOÀN SƠN
              </div>
              <img
                className={style.person__image}
                src="/assets/img/0F9A0024.JPG"
                alt="Groom"
                loading="lazy"
              />
            </div>

            {/* Bride */}
            <div
              className={clsx(style.person, style.person__bride, {
                [style.show]: showSection2,
              })}
            >
              <img
                className={style.person__image}
                src="/assets/img/0F9A0704.JPG"
                alt="Bride"
                loading="lazy"
              />
              <div className={style.person__name}>
                <p>Cô Dâu</p>
                NGUYỄN THÙY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section id="information" ref={section3Ref}>
        <div className={style.section_3}>
          <div
            className={clsx(style.section_3__content, {
              [style.show]: showSection3,
            })}
          >
            Tình yêu của anh và em là một hành trình kỳ diệu, vượt qua bao thử
            thách để cùng nhau bước đến ngày trọng đại - đám cưới của chúng
            mình. Đám cưới này là lời cam kết chân thành, là sự bắt đầu của một
            chương mới – nơi chúng ta cùng vun đắp tổ ấm, cùng sẻ chia mọi vui
            buồn và cùng nắm tay nhau đi đến cuối con đường mang tên hạnh phúc.
          </div>
        </div>
      </section>

      <section id="events" ref={section5Ref}>
        <div
          className={style.section_5}
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/0F9A6398.jpg)`,
          }}
        >
          <div
            className={clsx(style.section_5__content, {
              [style.show]: showSection5,
            })}
          >
            <h1 className={style.calendar_month}>November</h1>

            <div className={style.calendar_weekdays}>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THUR</div>
              <div>FRI</div>
              <div>SAT</div>
              <div>SUN</div>
            </div>

            <div className={style.calendar_grid}>
              <div className={style.empty}></div>
              <div className={style.empty}></div>
              <div className={style.empty}></div>
              <div className={style.empty}></div>
              <div className={style.empty}></div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div className={style.intimate_party_day}>
                9<div className={style.heart}>♥</div>
              </div>
              <div className={style.wedding_day}>
                10
                <div className={style.heart}>♥</div>
              </div>
              <div>11</div>
              <div>12</div>
              <div>13</div>
              <div>14</div>
              <div>15</div>
              <div>16</div>
              <div>17</div>
              <div>18</div>
              <div>19</div>
              <div>20</div>
              <div>21</div>
              <div>22</div>
              <div>23</div>
              <div>24</div>
              <div>25</div>
              <div>26</div>
              <div>27</div>
              <div>28</div>
              <div>29</div>
              <div>30</div>
            </div>

            <div className={style.calendar_legend}>
              <div className={style.legend_item}>
                <span className={style.legend_heart_light}>♥</span>
                <span>Ngày 9/11 - Tiệc Thân Mật</span>
              </div>
              <div className={style.legend_item}>
                <span className={style.legend_heart_deep}>♥</span>
                <span>Ngày 10/11 - Lễ Vu Quy và Lễ Thành Hôn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="location" ref={section4Ref}>
        <div className={style.section_4}>
          <div
            className={clsx(style.section_4__content, {
              [style.show]: showSection4,
            })}
          >
            <div className={style.section_4__content__item}>
              <h1>Nhà Trai</h1>
              <div className={style.section_4__content__item__info}>
                <p className={style.section_4__content__item__address}>
                  Địa Chỉ: Thôn Nghĩa La, X.Trung Chính, T.Bắc Ninh
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/safmjBfbv6TsEque9"
                target="_blank"
                rel="noopener noreferrer"
                className={style.section_4__content__item__button}
              >
                Xem bản đồ
              </a>
              <div className={style.section_4__content__item__divider} />
              <div className={style.section_4__content__item__event}>
                <h3>Tiệc thân mật</h3>
                <p>16:00 - 09/11/2025</p>
                <h3>Lễ thành hôn</h3>
                <p>10:00 - 10/11/2025</p>
              </div>
            </div>
            <img
              src="/assets/gif/loading.gif"
              alt="logo"
              className={style.section_4__logo}
            />
            <div className={style.section_4__content__item}>
              <h1>Nhà Gái</h1>
              <div className={style.section_4__content__item__info}>
                <p className={style.section_4__content__item__address}>
                  Địa Chỉ: 121 Ngõ 1, Tổ 2, L.Đa Sỹ, P.Kiến Hưng, TP.Hà Nội
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/v6ugiki5h7TX8euE6"
                target="_blank"
                rel="noopener noreferrer"
                className={style.section_4__content__item__button}
              >
                Xem bản đồ
              </a>
              <div className={style.section_4__content__item__divider} />
              <div className={style.section_4__content__item__event}>
                <h3>Tiệc thân mật</h3>
                <p>10:00 - 09/11/2025</p>
                <h3>Lễ vu quy</h3>
                <p>07:00 - 10/11/2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="album" ref={section6Ref}>
        <div className={style.section_6}>
          <div className={style.section_6__content}>
            <div className={style.section_6__content__text}>
              Từng tấm ảnh là một lát cắt thời gian đầy cảm xúc - tất cả hòa
              quyện tạo nên bản giao hưởng ngọt ngào của tình yêu, niềm vui và
              những kỷ niệm mà chúng ta sẽ mãi nâng niu suốt cuộc đời.
            </div>
            <div
              className={clsx(style.section_6__image, {
                [style.show]: showSection6,
              })}
            >
              <img
                src="/assets/img/0F9A1130.JPG"
                alt="Wedding couple"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Album Slider Section */}
      <section id="album-slider" ref={section7Ref}>
        <div className={style.section_7}>
          <div
            className={clsx(style.section_7__content, {
              [style.show]: showSection7,
            })}
          >
            <h1 className={style.section_7__title}>Album Ảnh Cưới</h1>
            <p className={style.section_7__subtitle}>
              Những khoảnh khắc đáng nhớ của chúng tôi
            </p>

            {/* Main Image Display */}
            <div
              className={style.section_7__main_image}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={albumImages[currentImageIndex]}
                alt={`Wedding ${currentImageIndex + 1}`}
                onClick={handleImageClick}
                className={style.section_7__main_image__img}
                loading="eager"
              />
              <div className={style.section_7__image_counter}>
                {currentImageIndex + 1} / {albumImages.length}
              </div>
            </div>

            {/* Thumbnail List */}
            <div className={style.section_7__thumbnails}>
              {albumImages.map((image, index) => (
                <div
                  key={index}
                  className={clsx(style.section_7__thumbnail, {
                    [style.active]: index === currentImageIndex,
                  })}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Zoomed Image */}
      {isModalOpen && (
        <div className={style.modal} onClick={handleCloseModal}>
          <div
            className={style.modal__content}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button className={style.modal__close} onClick={handleCloseModal}>
              &times;
            </button>
            <button className={style.modal__prev} onClick={handlePrevImage}>
              &#10094;
            </button>
            <img
              src={albumImages[currentImageIndex]}
              alt={`Wedding ${currentImageIndex + 1}`}
              className={style.modal__image}
            />
            <button className={style.modal__next} onClick={handleNextImage}>
              &#10095;
            </button>
            <div className={style.modal__counter}>
              {currentImageIndex + 1} / {albumImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
