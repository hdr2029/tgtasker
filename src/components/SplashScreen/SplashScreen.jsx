import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/check-animation.json";
import "./SplashScreen.css";

const SplashScreen = ({ isFadingOut = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return () => {};
    }

    const instance = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData,
    });

    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <div
      className={`splash-screen${isFadingOut ? " splash-screen--fade-out" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="splash-screen__animation" ref={containerRef} />
    </div>
  );
};

export default SplashScreen;
