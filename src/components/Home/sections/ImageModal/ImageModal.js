import React from "react";
import style from "./ImageModal.module.scss";

const ImageModal = ({ 
  isOpen, 
  albumImages, 
  currentImageIndex, 
  onClose, 
  onNext, 
  onPrev,
  onTouchStart,
  onTouchMove,
  onTouchEnd 
}) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal} onClick={onClose}>
      <div
        className={style.modal__content}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button className={style.modal__close} onClick={onClose}>
          &times;
        </button>
        <button className={style.modal__prev} onClick={onPrev}>
          &#10094;
        </button>
        <img
          src={albumImages[currentImageIndex]}
          alt={`Wedding ${currentImageIndex + 1}`}
          className={style.modal__image}
        />
        <button className={style.modal__next} onClick={onNext}>
          &#10095;
        </button>
        <div className={style.modal__counter}>
          {currentImageIndex + 1} / {albumImages.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;