import React from "react";
import clsx from "clsx";
import style from "./InformationSection.module.scss";

const InformationSection = ({ sectionRef, showSection }) => {
  return (
    <section id="information" ref={sectionRef}>
      <div className={style.information}>
        <div
          className={clsx(style.information__content, {
            [style.show]: showSection,
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
  );
};

export default InformationSection;