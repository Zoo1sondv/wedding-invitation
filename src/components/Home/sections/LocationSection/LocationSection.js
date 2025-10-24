import React from "react";
import clsx from "clsx";
import { getAssetUrl } from "../../../../utils/config";
import style from "./LocationSection.module.scss";

const LocationSection = ({ sectionRef, showSection }) => {
  return (
    <section id="location" ref={sectionRef}>
      <div className={style.location}>
        <div className={style.location__content}>
          <div
            className={clsx(style.location__item, style.location__item__groom, {
              [style.show]: showSection,
            })}
          >
            <h1>Ngày Tổ Chức Tiệc</h1>
            <div className={style.location__event}>
              <h3>CHỦ NHẬT | 16H00</h3>
              <h3>09.11.2025</h3>
              <h3 className={"my-4"}>TẠI TƯ GIA NHÀ TRAI</h3>
              <p>(Nhằm Ngày 20 Tháng 09 Năm Ất Tỵ)</p>
              <p className={style.location__address}>
                Thôn Nghĩa La, X.Trung Chính
                <br /> T.Bắc Ninh
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
          </div>

          <img
            src={getAssetUrl("/assets/gif/loading.gif")}
            alt="logo"
            className={clsx(style.location__logo, {
              [style.show]: showSection,
            })}
          />

          <div
            className={clsx(style.location__item, style.location__item__bride, {
              [style.show]: showSection,
            })}
          >
            <h1>Ngày Tổ Chức Tiệc</h1>
            <div className={style.location__event}>
              <h3>CHỦ NHẬT | 10H00</h3>
              <h3>09.11.2025</h3>
              <h3 className={"my-4"}>TẠI TƯ GIA NHÀ GÁI</h3>
              <p>(Nhằm Ngày 20 Tháng 09 Năm Ất Tỵ)</p>
              <p className={style.location__address}>
                121 Ngõ 1, Tổ 2, L.Đa Sỹ, P.Kiến Hưng
                <br />
                TP.Hà Nội
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
