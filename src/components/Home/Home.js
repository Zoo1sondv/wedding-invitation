import React, { useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { getAssetUrl } from "../../utils/config";
import HeroSection from "./sections/HeroSection";
import InvitationSection from "./sections/InvitationSection";
import InformationSection from "./sections/InformationSection";
import EventCalendarSection from "./sections/EventCalendarSection";
import LocationSection from "./sections/LocationSection";
import WeddingCeremony from "./sections/WeddingCeremony";
import AlbumPreviewSection from "./sections/AlbumPreviewSection";
import AlbumSliderSection from "./sections/AlbumSliderSection";
import VideoSection from "./sections/VideoSection";
import ImageModal from "./sections/ImageModal";
import ContactForm from "./sections/ContactForm";
import CountdownSection from "./sections/CountdownSection";
import ThankYouSection from "./sections/ThankYouSection";
import style from "./home.module.scss";

const Home = () => {
  const [heroRef, showHero] = useScrollAnimation({ threshold: 0.3 });
  const [invitationRef, showInvitation] = useScrollAnimation({
    threshold: 0.3,
  });
  const [informationRef, showInformation] = useScrollAnimation({
    threshold: 0.3,
  });
  const [locationRef, showLocation] = useScrollAnimation({ threshold: 0.3 });
  const [calendarRef, showCalendar] = useScrollAnimation({ threshold: 0.3 });
  const [weddingCeremonyRef, showWeddingCeremony] = useScrollAnimation({
    threshold: 0.3,
  });
  const [albumPreviewRef, showAlbumPreview] = useScrollAnimation({
    threshold: 0.3,
  });
  const [albumSliderRef, showAlbumSlider] = useScrollAnimation({
    threshold: 0.3,
  });
  const [videoRef, showVideo] = useScrollAnimation({ threshold: 0.3 });
  const [contactFormRef, showContactForm] = useScrollAnimation({
    threshold: 0.3,
  });
  const [countdownRef, showCountdown] = useScrollAnimation({ threshold: 0.3 });
  const [thankYouRef, showThankYou] = useScrollAnimation({ threshold: 0.3 });

  const albumImages = [
    getAssetUrl("/assets/img/0F9A0024.jpg"),
    getAssetUrl("/assets/img/0F9A0090.jpg"),
    getAssetUrl("/assets/img/0F9A0111.jpg"),
    getAssetUrl("/assets/img/0F9A0175.jpg"),
    getAssetUrl("/assets/img/0F9A0290.jpg"),
    getAssetUrl("/assets/img/0F9A0386.jpg"),
    getAssetUrl("/assets/img/0F9A0430.jpg"),
    getAssetUrl("/assets/img/0F9A0469.jpg"),
    getAssetUrl("/assets/img/0F9A0530.jpg"),
    getAssetUrl("/assets/img/0F9A0567.jpg"),
    getAssetUrl("/assets/img/0F9A0625.jpg"),
    getAssetUrl("/assets/img/0F9A0704.jpg"),
    getAssetUrl("/assets/img/0F9A0754.jpg"),
    getAssetUrl("/assets/img/0F9A0785.jpg"),
    getAssetUrl("/assets/img/0F9A0867.jpg"),
    getAssetUrl("/assets/img/0F9A0912.jpg"),
    getAssetUrl("/assets/img/0F9A1130.jpg"),
    getAssetUrl("/assets/img/0F9A1373.jpg"),
    getAssetUrl("/assets/img/0F9A1614.jpg"),
    getAssetUrl("/assets/img/0F9A1826.jpg"),
    getAssetUrl("/assets/img/0F9A6199.jpg"),
    getAssetUrl("/assets/img/0F9A6237.jpg"),
    getAssetUrl("/assets/img/0F9A6267.jpg"),
    getAssetUrl("/assets/img/0F9A6312.jpg"),
    getAssetUrl("/assets/img/0F9A6359.jpg"),
    getAssetUrl("/assets/img/0F9A6366.jpg"),
    getAssetUrl("/assets/img/0F9A6398.jpg"),
    getAssetUrl("/assets/img/0F9A6438.jpg"),
    getAssetUrl("/assets/img/0F9A6634.jpg"),
    getAssetUrl("/assets/img/0F9A6676.jpg"),
    getAssetUrl("/assets/img/0F9A6688.jpg"),
  ];

  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const minSwipeDistance = 50;

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setCurrentSliderIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSliderIndex(currentImageIndex);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === albumImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? albumImages.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
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
    <div className={style.home}>
      <HeroSection sectionRef={heroRef} showSection={showHero} />

      <InvitationSection
        sectionRef={invitationRef}
        showSection={showInvitation}
      />

      <InformationSection
        sectionRef={informationRef}
        showSection={showInformation}
      />

      <EventCalendarSection
        sectionRef={calendarRef}
        showSection={showCalendar}
      />

      <LocationSection sectionRef={locationRef} showSection={showLocation} />

      <WeddingCeremony
        sectionRef={weddingCeremonyRef}
        showSection={showWeddingCeremony}
      />

      <AlbumPreviewSection
        sectionRef={albumPreviewRef}
        showSection={showAlbumPreview}
      />

      <AlbumSliderSection
        sectionRef={albumSliderRef}
        showSection={showAlbumSlider}
        albumImages={albumImages}
        onImageClick={handleImageClick}
        currentIndex={currentSliderIndex}
        onIndexChange={setCurrentSliderIndex}
      />

      <VideoSection sectionRef={videoRef} showSection={showVideo} />

      <ContactForm sectionRef={contactFormRef} showSection={showContactForm} />

      <CountdownSection sectionRef={countdownRef} showSection={showCountdown} />

      <ThankYouSection sectionRef={thankYouRef} showSection={showThankYou} />

      <ImageModal
        isOpen={isModalOpen}
        albumImages={albumImages}
        currentImageIndex={currentImageIndex}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default Home;
