import React from "react";
import clsx from "clsx";
import { getAssetUrl } from "../../../../utils/config";
import style from "./HeroSection.module.scss";

const HeroSection = ({ sectionRef, showSection }) => {
  return (
    <section id="home" ref={sectionRef}>
      <div className={style.hero}>
        <img
          className={style.hero__image}
          src={getAssetUrl("/assets/img/0F9A1826.jpg")}
          alt="Wedding couple"
          loading="eager"
        />
        <div
          className={clsx(style.hero__content, {
            [style.show]: showSection,
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
  );
};

export default HeroSection;