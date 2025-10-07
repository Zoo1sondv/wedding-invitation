import React, { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Loading duration: 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Đợi thêm một chút để animation fade out hoàn tất
      setTimeout(() => {
        setLoadingComplete(true);
      }, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
};
