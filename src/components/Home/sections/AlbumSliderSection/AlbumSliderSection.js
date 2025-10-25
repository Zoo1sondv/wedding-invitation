import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import style from "./AlbumSliderSection.module.scss";

const AlbumSliderSection = React.memo(
  ({
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
    const scrollTimeoutRef = useRef(null);

    const currentImageIndex = currentIndex;
    const setCurrentImageIndex = useCallback(
      (value) => {
        if (typeof value === "function") {
          onIndexChange((prev) => value(prev));
        } else {
          onIndexChange(value);
        }
      },
      [onIndexChange]
    );

    // Throttled scroll to prevent performance issues
    useEffect(() => {
      if (thumbnailRefs.current[currentImageIndex] && thumbnailsRef.current) {
        // Clear previous timeout to throttle scroll
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          const thumbnail = thumbnailRefs.current[currentImageIndex];
          const container = thumbnailsRef.current;
          if (thumbnail && container) {
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
        }, 50); // Throttle scroll by 50ms
      }

      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [currentImageIndex]);

    // Auto-slide with longer interval (5 seconds instead of 3)
    useEffect(() => {
      if (isUserInteracted || !showSection) {
        return;
      }

      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Increased from 3000ms to 5000ms

      return () => clearInterval(timer);
    }, [
      albumImages.length,
      isUserInteracted,
      setCurrentImageIndex,
      showSection,
    ]);

    const handleThumbnailClick = useCallback(
      (index) => {
        setIsUserInteracted(true);
        setCurrentImageIndex(index);
      },
      [setCurrentImageIndex]
    );

    const handleNextImage = useCallback(() => {
      setIsUserInteracted(true);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
      );
    }, [setCurrentImageIndex, albumImages.length]);

    const handlePrevImage = useCallback(() => {
      setIsUserInteracted(true);
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? albumImages.length - 1 : prevIndex - 1
      );
    }, [setCurrentImageIndex, albumImages.length]);

    const onTouchStart = useCallback((e) => {
      setTouchEnd(0);
      setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const onTouchMove = useCallback((e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const onTouchEnd = useCallback(() => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        handleNextImage();
      } else if (isRightSwipe) {
        handlePrevImage();
      }
    }, [
      touchStart,
      touchEnd,
      minSwipeDistance,
      handleNextImage,
      handlePrevImage,
    ]);

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
              <div
                className={style.albumSlider__main_image__img}
                style={{
                  backgroundImage: `url(${albumImages[currentImageIndex]})`,
                }}
              />
              <div className={style.albumSlider__clickHint}>
                <span>👆 Nhấn để xem chi tiết</span>
              </div>
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
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

AlbumSliderSection.displayName = "AlbumSliderSection";

export default AlbumSliderSection;
