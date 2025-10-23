import React from "react";
import clsx from "clsx";
import { getAssetUrl } from "../../../../utils/config";
import style from "./LocationSection.module.scss";

const LocationSection = ({ sectionRef, showSection }) => {
  return (
    <section id="location" ref={sectionRef}>
      <div className={style.location}>
        <div
          className={clsx(style.location__content, {
            [style.show]: showSection,
          })}
        >
          <div className={style.location__item}>
            <h1>Nhà Trai</h1>
            <div className={style.location__info}>
              <p className={style.location__address}>
                Địa Chỉ: Thôn Nghĩa La, X.Trung Chính, T.Bắc Ninh
              </p>
            </div>

            <a
              href="https://maps.app.goo.gl/safmjBfbv6TsEque9"
              target="_blank"
              rel="noopener noreferrer"
              className={style.location__button}
            >
              Xem bản đồ
            </a>
            <div className={style.location__divider} />
            <div className={style.location__event}>
              <h3>Tiệc thân mật</h3>
              <p>16:00 - 09/11/2025</p>
              <h3>Lễ thành hôn</h3>
              <p>10:00 - 10/11/2025</p>
            </div>
          </div>

          <img
            src={getAssetUrl("/assets/gif/loading.gif")}
            alt="logo"
            className={style.location__logo}
          />

          <div className={style.location__item}>
            <h1>Nhà Gái</h1>
            <div className={style.location__info}>
              <p className={style.location__address}>
                Địa Chỉ: 121 Ngõ 1, Tổ 2, L.Đa Sỹ, P.Kiến Hưng, TP.Hà Nội
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/v6ugiki5h7TX8euE6"
              target="_blank"
              rel="noopener noreferrer"
              className={style.location__button}
            >
              Xem bản đồ
            </a>
            <div className={style.location__divider} />
            <div className={style.location__event}>
              <h3>Tiệc thân mật</h3>
              <p>10:00 - 09/11/2025</p>
              <h3>Lễ vu quy</h3>
              <p>07:00 - 10/11/2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;