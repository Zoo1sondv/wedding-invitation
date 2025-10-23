import React from "react";
import clsx from "clsx";
import style from "./ThankYouSection.module.scss";
import { getAssetUrl } from "../../../../utils/config";

const ThankYouSection = ({ sectionRef, showSection }) => {
  return (
    <section id="thankyou" ref={sectionRef}>
      <div 
        className={style.thankYouSection}
        style={{ backgroundImage: `url(${getAssetUrl('/assets/img/0F9A0175.jpg')})` }}
      >
        <div
          className={clsx(style.thankYouSection__content, {
            [style.show]: showSection,
          })}
        >
          <div className={style.thankYouSection__text}>
            <p>
              Cảm ơn bạn đã dành tình cảm cho chúng mình! sự hiện diện
             của bạn chính là món quà nghĩa nhất, và chúng 
              mình vô cùng trân quý khi được cùng bạn chia sẻ những 
              hạnh phúc trong ngày trọng đại này.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouSection;