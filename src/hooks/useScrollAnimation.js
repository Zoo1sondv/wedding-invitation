import { useEffect, useState, useRef } from "react";
import { useLoading } from "../context/LoadingContext";

const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const { loadingComplete } = useLoading();

  useEffect(() => {
    if (!loadingComplete) return;

    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.2,
      rootMargin: "0px",
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, disconnect observer to prevent re-triggering
          observer.disconnect();
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
