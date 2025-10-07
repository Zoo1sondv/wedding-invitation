import React from "react";
import style from "./loading.module.scss";
import { useLoading } from "../../context/LoadingContext";

function LoadingPage() {
  const { isLoading } = useLoading();

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
