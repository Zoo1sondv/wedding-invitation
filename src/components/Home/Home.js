import React from "react";
import style from "./home.module.scss";
import clsx from "clsx";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Home = () => {
  const [section1Ref, showSection1] = useScrollAnimation({ threshold: 0.3 });
  const [section2Ref, showSection2] = useScrollAnimation({ threshold: 0.3 });
  const [section3Ref, showSection3] = useScrollAnimation({ threshold: 0.3 });
  const [section4Ref, showSection4] = useScrollAnimation({ threshold: 0.3 });

  return (
    <div className={style.home}>
      {/* Hero Section */}
      <section id="home" ref={section1Ref}>
        <div className={style.section_1}>
          <img
            className={style.section_1__image}
            src="/assets/img/0F9A1821.JPG"
            alt="Wedding couple"
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
                src="/assets/img/0F9A0029.JPG"
                alt="Groom"
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
                src="/assets/img/0F9A0682.JPG"
                alt="Bride"
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
          <div
            className={clsx(style.section_3__image, {
              [style.show]: showSection3,
            })}
          >
            <img src="/assets/img/0F9A1131.JPG" alt="Wedding couple" />
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
              <h1>NHÀ TRAI</h1>
              <h3>Bố: Đoàn Văn Bẩy</h3>
              <h3>Mẹ: Nguyễn Thị Ngân</h3>
            </div>
            <div className={style.section_4__content__item}>
              <h1>NHÀ GÁI</h1>
              <h3>Bố: Nuyễn Văn Thuật</h3>
              <h3>Mẹ: Lê Thị Thanh</h3>
            </div>
          </div>

          <img
            src="/assets/gif/loading.gif"
            alt="logo"
            className={style.section_4__logo}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
