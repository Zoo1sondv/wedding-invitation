import React, { useEffect, useRef, useState } from "react";
import style from "./overlay.module.scss";
import clsx from "clsx";
import { getAssetUrl } from "../../utils/config";

const Overlay = () => {
  const [music, setMusic] = useState(true);
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const playAudio = () => {
      if (!hasInteractedRef.current && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            hasInteractedRef.current = true;
            setMusic(true);
            document.removeEventListener("click", playAudio);
            document.removeEventListener("scroll", playAudio);
            document.removeEventListener("keydown", playAudio);
            document.removeEventListener("touchstart", playAudio);
          })
          .catch(() => {
            setMusic(false);
          });
      }
    };

    playAudio();

    document.addEventListener("click", playAudio);
    document.addEventListener("scroll", playAudio);
    document.addEventListener("keydown", playAudio);
    document.addEventListener("touchstart", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
      document.removeEventListener("scroll", playAudio);
      document.removeEventListener("keydown", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (music) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusic(!music);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.overlay}>
      <div className={style.overlay__music} onClick={toggleMusic}>
        <audio ref={audioRef} src={getAssetUrl("/assets/audio/wedding-music.mp3")} loop />
        <img
          src={getAssetUrl("/assets/svg/music.svg")}
          alt="music"
          className={clsx({
            [style.stop]: !music,
          })}
        />
      </div>
      <div className={style.overlay__scroll_top}>
        <img
          src={getAssetUrl("/assets/svg/scroll-top.svg")}
          alt="scroll-top"
          onClick={scrollToTop}
        />
      </div>
    </div>
  );
};

export default Overlay;
