import lottie from "lottie-web";
import loads from "@/lottie/loading.json";
import React, { useEffect, useRef } from "react";
const Loading = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loads,
    });
    return () => {
      lottie.destroy();
    };
  }, []);
  return (
    <>
      <div className="absolute w-screen h-screen bg-background animate-pulse">
        <div
          ref={container}
          className=" top-1/2 -translate-y-1/2 duration-300 relative left-1/2 -translate-x-1/2 text-center w-1/4"
        ></div>
        <h2 className="text-center absolute md:top-2/3 mt-5 top-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 opacity-50 font-thin text-primary">
          Loading...
        </h2>
      </div>
    </>
  );
};
export default Loading;
