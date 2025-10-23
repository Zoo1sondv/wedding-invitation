import React from "react";
import clsx from "clsx";
import { getAssetUrl } from "../../../../utils/config";
import style from "./AlbumPreviewSection.module.scss";

const AlbumPreviewSection = ({ sectionRef, showSection }) => {
  return (
    <section id="album" ref={sectionRef}>
      <div className={style.albumPreview}>
        <div className={style.albumPreview__content}>
          <div className={style.albumPreview__text}>
            Từng tấm ảnh là một lát cắt thời gian đầy cảm xúc - tất cả hòa
            quyện tạo nên bản giao hưởng ngọt ngào của tình yêu, niềm vui và
            những kỷ niệm mà chúng ta sẽ mãi nâng niu suốt cuộc đời.
          </div>
          <div
            className={clsx(style.albumPreview__image, {
              [style.show]: showSection,
            })}
          >
            <img
              src={getAssetUrl("/assets/img/0F9A1130.JPG")}
              alt="Wedding couple"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumPreviewSection;