import React, { useState, useEffect } from "react";
import clsx from "clsx";
import style from "./AlbumSliderSection.module.scss";

const AlbumSliderSection = ({ 
  sectionRef, 
  showSection, 
  albumImages, 
  onImageClick 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Auto slide effect - only run when user hasn't interacted
  useEffect(() => {
    if (isUserInteracted) {
      return; // Don't auto-slide if user has interacted
    }

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, [albumImages.length, isUserInteracted]);

  const handleThumbnailClick = (index) => {
    setIsUserInteracted(true); // Stop auto-slide when user clicks thumbnail
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setIsUserInteracted(true); // Stop auto-slide when user navigates
    setCurrentImageIndex((prevIndex) =>
      prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setIsUserInteracted(true); // Stop auto-slide when user navigates
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? albumImages.length - 1 : prevIndex - 1
    );
  };

  // Touch handlers for swipe gestures
  const onTouchStart = (e) => {
    setTouchEnd(0); // Reset touchEnd
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
      // Swipe left -> next image
      handleNextImage();
    } else if (isRightSwipe) {
      // Swipe right -> previous image
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
            Những khoảnh khắc đáng nhớ của chúng tôi
          </p>

          {/* Main Image Display */}
          <div
            className={style.albumSlider__main_image}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={albumImages[currentImageIndex]}
              alt={`Wedding ${currentImageIndex + 1}`}
              onClick={() => onImageClick(currentImageIndex)}
              className={style.albumSlider__main_image__img}
              loading="eager"
            />
            <div className={style.albumSlider__image_counter}>
              {currentImageIndex + 1} / {albumImages.length}
            </div>
          </div>

          {/* Thumbnail List */}
          <div className={style.albumSlider__thumbnails}>
            {albumImages.map((image, index) => (
              <div
                key={index}
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