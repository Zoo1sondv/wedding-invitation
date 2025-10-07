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
    <div>
      <section id="home" ref={sectionRef}>
        <div className={style.section_1}>
          <img
            className={style.section_1__image}
            src={"/assets/img/0F9A0112.JPG"}
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
      <section id="about" ref={sectionRef2}>
        <div className={style.section_2}>
          <img
            className={style.section_2__image}
            src={"/assets/img/0F9A0112.JPG"}
            alt="avatar"
          />
          <div className={style.section_2__content}>
            <h1>Tôi là</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
