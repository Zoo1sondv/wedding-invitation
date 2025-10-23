import React, { useEffect } from "react";
import style from "./loading.module.scss";
import { useLoading } from "../../context/LoadingContext";

function LoadingPage() {
  const { isLoading } = useLoading();

  useEffect(() => {
    if (!isLoading) {
      // Scroll về top sau khi loading xong
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [isLoading]);

  return (
    <div
      className={isLoading ? style["preloader"] : style["preloader-none"]}
      style={{
        backgroundImage: `url("/assets/gif/loading.gif")`,
      }}
    />
  );
}

export default LoadingPage;
