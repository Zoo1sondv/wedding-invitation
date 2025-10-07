import { useEffect, useState, useRef } from "react";
import { useLoading } from "../context/LoadingContext";

/**
 * Custom hook để trigger animation khi element xuất hiện trong viewport
 * Hook này chỉ bắt đầu observe sau khi loading screen hoàn tất
 * Animation sẽ trigger lại mỗi khi scroll trở lại section
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isVisible] - ref để gắn vào element và state visible
 */
const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const { loadingComplete } = useLoading();

  useEffect(() => {
    // Chỉ bắt đầu observe khi loading đã hoàn tất
    if (!loadingComplete) return;

    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.2, // 20% của element xuất hiện thì trigger
      rootMargin: "0px",
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger animation khi element vào viewport
          setIsVisible(true);
        } else {
          // Reset animation khi element ra khỏi viewport
          setIsVisible(false);
        }
      });
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [loadingComplete, options]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
