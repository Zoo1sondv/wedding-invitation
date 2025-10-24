import React from "react";
import clsx from "clsx";
import { getAssetUrl } from "../../../../utils/config";
import style from "./WeddingCeremony.module.scss";

const WeddingCeremony = ({ sectionRef, showSection }) => {
  const DecorativeDivider = () => (
    <svg
      className={style.decorative__divider}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="20"
        x2="200"
        y2="20"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.5"
      />
      <path d="M100 10 L110 20 L100 30 L90 20 Z" fill="#fff" opacity="0.8" />
      <circle cx="100" cy="20" r="3" fill="#fff" />
      <circle cx="70" cy="20" r="2.5" fill="#fff" opacity="0.7" />
      <circle cx="60" cy="20" r="1.5" fill="#fff" opacity="0.6" />
      <circle cx="130" cy="20" r="2.5" fill="#fff" opacity="0.7" />
      <circle cx="140" cy="20" r="1.5" fill="#fff" opacity="0.6" />
    </svg>
  );

  return (
    <section id="wedding-ceremony" ref={sectionRef}>
      <div
        className={style.ceremony}
        style={{
          backgroundImage: `url(${getAssetUrl("/assets/img/0F9A1373.jpg")})`,
        }}
      >
        <div className={style.ceremony__content}>
          <div
            className={clsx(style.ceremony__divider_top, {
              [style.show]: showSection,
            })}
          >
            <DecorativeDivider />
          </div>

          <div
            className={clsx(style.ceremony__item, style.ceremony__item_first, {
              [style.show]: showSection,
            })}
          >
            <h1>Lễ Thành Hôn</h1>
            <h3>Thứ Hai - 10:00</h3>
            <div className={style.ceremony__date}>
              <h3>Tháng 03</h3>
              <div className={style.ceremony__slash} />
              <h3>10</h3>
              <div className={style.ceremony__slash} />
              <h3>2025</h3>
            </div>
            <p>(Nhằm Ngày 21 Tháng 09 Năm Ất Tỵ)</p>
          </div>

          <div
            className={clsx(style.ceremony__divider_middle, {
              [style.show]: showSection,
            })}
          >
            <DecorativeDivider />
          </div>

          <div
            className={clsx(style.ceremony__item, style.ceremony__item_second, {
              [style.show]: showSection,
            })}
          >
            <h1>Lễ Vu Quy</h1>
            <h3>Thứ Hai - 07:00</h3>
            <div className={style.ceremony__date}>
              <h3>Tháng 03</h3>
              <div className={style.ceremony__slash} />
              <h3>10</h3>
              <div className={style.ceremony__slash} />
              <h3>2025</h3>
            </div>
            <p>(Nhằm Ngày 21 Tháng 09 Năm Ất Tỵ)</p>
          </div>

          <div
            className={clsx(style.ceremony__divider_bottom, {
              [style.show]: showSection,
            })}
          >
            <DecorativeDivider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingCeremony;
