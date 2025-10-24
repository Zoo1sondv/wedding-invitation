import React, { useState, useEffect } from "react";
import clsx from "clsx";
import style from "./CountdownSection.module.scss";
import { getAssetUrl } from "../../../../utils/config";

const CountdownSection = ({ sectionRef, showSection }) => {
  const weddingDate = React.useMemo(() => new Date("2025-11-10T10:00:00"), []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section id="countdown" ref={sectionRef}>
      <div
        className={style.countdownSection}
        style={{
          backgroundImage: `url(${getAssetUrl("/assets/img/0F9A6688.jpg")})`,
        }}
      >
        <div
          className={clsx(style.countdownSection__content, {
            [style.show]: showSection,
          })}
        >
          <div className={style.countdownSection__header}>
            <h2>Countdown</h2>
          </div>

          <div className={style.countdownSection__timer}>
            <div
              className={clsx(
                style.countdownSection__timeUnit,
                style.countdownSection__timeUnit_days,
                { [style.show]: showSection }
              )}
            >
              <div className={style.countdownSection__label}>Ngày</div>
              <div className={style.countdownSection__number}>
                {formatNumber(timeLeft.days)}
              </div>
            </div>
          </div>

          <div className={style.countdownSection__timer_row2}>
            <div
              className={clsx(
                style.countdownSection__timeUnit,
                style.countdownSection__timeUnit_2,
                { [style.show]: showSection }
              )}
            >
              <div className={style.countdownSection__label}>Giờ</div>
              <div className={style.countdownSection__number}>
                {formatNumber(timeLeft.hours)}
              </div>
            </div>

            <div className={style.countdownSection__separator}>:</div>

            <div
              className={clsx(
                style.countdownSection__timeUnit,
                style.countdownSection__timeUnit_3,
                { [style.show]: showSection }
              )}
            >
              <div className={style.countdownSection__label}>Phút</div>
              <div className={style.countdownSection__number}>
                {formatNumber(timeLeft.minutes)}
              </div>
            </div>

            <div className={style.countdownSection__separator}>:</div>

            <div
              className={clsx(
                style.countdownSection__timeUnit,
                style.countdownSection__timeUnit_4,
                { [style.show]: showSection }
              )}
            >
              <div className={style.countdownSection__label}>Giây</div>
              <div className={style.countdownSection__number}>
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
