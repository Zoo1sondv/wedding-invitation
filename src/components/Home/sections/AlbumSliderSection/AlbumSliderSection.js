import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import style from "./AlbumSliderSection.module.scss";

const AlbumSliderSection = ({
  sectionRef,
  showSection,
  albumImages,
  onImageClick,
  currentIndex = 0,
  onIndexChange,
}) => {
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50;
  const thumbnailsRef = useRef(null);
  const thumbnailRefs = useRef([]);

  const currentImageIndex = currentIndex;
  const setCurrentImageIndex = (value) => {
    if (typeof value === "function") {
      onIndexChange((prev) => value(prev));
    } else {
      onIndexChange(value);
    }
  };

  useEffect(() => {
    if (thumbnailRefs.current[currentImageIndex] && thumbnailsRef.current) {
      const thumbnail = thumbnailRefs.current[currentImageIndex];
      const container = thumbnailsRef.current;
      const thumbnailLeft = thumbnail.offsetLeft;
      const thumbnailWidth = thumbnail.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollPosition =
        thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentImageIndex]);

  useEffect(() => {
    if (isUserInteracted) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [albumImages.length, isUserInteracted]);

  const handleThumbnailClick = (index) => {
    setIsUserInteracted(true);
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setIsUserInteracted(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setIsUserInteracted(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? albumImages.length - 1 : prevIndex - 1
    );
  };

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }
  };

  return (
    <section id="album-slider" ref={sectionRef}>
      <div className={style.albumSlider}>
        <div
          className={clsx(style.albumSlider__content, {
            [style.show]: showSection,
          })}
        >
          <h1 className={style.albumSlider__title}>Album Ảnh Cưới</h1>
          <p className={style.albumSlider__subtitle}>
            Những khoảnh khắc đáng nhớ của chúng mình
          </p>

          <div
            className={style.albumSlider__main_image}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={() => onImageClick(currentImageIndex)}
          >
            <img
              src={albumImages[currentImageIndex]}
              alt={`Wedding ${currentImageIndex + 1}`}
              className={style.albumSlider__main_image__img}
              loading="eager"
            />
            <div className={style.albumSlider__image_counter}>
              {currentImageIndex + 1} / {albumImages.length}
            </div>
          </div>

          <div className={style.albumSlider__thumbnails} ref={thumbnailsRef}>
            {albumImages.map((image, index) => (
              <div
                key={index}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                className={clsx(style.albumSlider__thumbnail, {
                  [style.active]: index === currentImageIndex,
                })}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumSliderSection;
