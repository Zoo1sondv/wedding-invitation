import React, { useEffect } from "react";
import style from "./loading.module.scss";
import { useLoading } from "../../context/LoadingContext";
import { getAssetUrl } from "../../utils/config";

function LoadingPage() {
  const { isLoading } = useLoading();

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [isLoading]);

  return (
    <div
      className={isLoading ? style["preloader"] : style["preloader-none"]}
      style={{
        backgroundImage: `url("${getAssetUrl("/assets/gif/loading.gif")}")`,
      }}
    />
  );
}

export default LoadingPage;
