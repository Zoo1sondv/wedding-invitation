import React from "react";
import style from "./home.module.scss";
import clsx from "clsx";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Home = () => {
  const [sectionRef, showContent] = useScrollAnimation({
    threshold: 0.3,
  });

  const [sectionRef2, showContent2] = useScrollAnimation({
    threshold: 0.3,
  });

  return (
    <div className={style.home}>
      <section id="home" ref={sectionRef}>
        <div className={style.section_1}>
          <img
            className={style.section_1__image}
            src={"/assets/img/0F9A1821.JPG"}
            alt="avatar"
          />
          <div
            className={clsx(style.section_1__content, {
              [style.show]: showContent,
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
      <section
        id="invitation-letter"
        ref={sectionRef2}
        className={clsx({
          [style.show]: showContent2,
        })}
      >
        <div className={style.section_2}>
          <div
            className={clsx(style.section_2__content, {
              [style.show]: showContent2,
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
          <div className={style.section_2__image}>
            <div className={style.section_2__image__husband}>
              <div className={style.section_2__image__husband__name}>
                <p>Chú Rể</p>
                ĐOÀN SƠN
              </div>
              <img
                className={style.section_2__image__husband__image}
                src={"/assets/img/0F9A0029.JPG"}
                alt="husband"
              />
            </div>
            <div className={style.section_2__image__wife}>
              <img
                className={style.section_2__image__wife__image}
                src={"/assets/img/0F9A0682.JPG"}
                alt="wife"
              />
              <div className={style.section_2__image__wife__name}>
                <p>Cô Dâu</p>
                NGUYỄN THÙY
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
