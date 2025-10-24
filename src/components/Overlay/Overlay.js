import React, { useEffect, useRef, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import style from "./overlay.module.scss";
import clsx from "clsx";
import { getAssetUrl } from "../../utils/config";

const Overlay = () => {
  const [music, setMusic] = useState(true);
  const [isRSVPExpanded, setIsRSVPExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const hoverTimeoutRef = useRef(null);
  const isHoveringRef = useRef(false);

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

  useEffect(() => {
    const expandInterval = setInterval(() => {
      if (!isHoveringRef.current) {
        setIsRSVPExpanded(true);

        setTimeout(() => {
          if (!isHoveringRef.current) {
            setIsRSVPExpanded(false);
          }
        }, 3000);
      }
    }, 8000);

    return () => {
      clearInterval(expandInterval);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById("rsvp");
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const firstInput = document.querySelector("#rsvp input[name='name']");
        if (firstInput) {
          firstInput.focus();
        }
      }, 800);
    }
  };

  const handleRSVPMouseEnter = () => {
    isHoveringRef.current = true;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsRSVPExpanded(true);
  };

  const handleRSVPMouseLeave = () => {
    isHoveringRef.current = false;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsRSVPExpanded(false);
    }, 150);
  };

  return (
    <div className={style.overlay}>
      <div className={style.overlay__music} onClick={toggleMusic}>
        <audio
          ref={audioRef}
          src={getAssetUrl("/assets/audio/wedding-music.mp3")}
          loop
        />
        <img
          src={getAssetUrl("/assets/svg/music.svg")}
          alt="music"
          className={clsx({
            [style.stop]: !music,
          })}
        />
      </div>

      <div
        className={`${style.overlay__rsvp} ${isRSVPExpanded ? style.expanded : ""}`}
        onClick={scrollToRSVP}
        onMouseEnter={handleRSVPMouseEnter}
        onMouseLeave={handleRSVPMouseLeave}
        onTouchStart={() => setIsRSVPExpanded(true)}
      >
        <FaCalendarCheck className={style.overlay__rsvp_icon} />
        <span className={style.overlay__rsvp_text}>Xác Nhận Tham Dự</span>
      </div>

      {showScrollTop && (
        <div className={style.overlay__scroll_top}>
          <img
            src={getAssetUrl("/assets/svg/scroll-top.svg")}
            alt="scroll-top"
            onClick={scrollToTop}
          />
        </div>
      )}
    </div>
  );
};

export default Overlay;
