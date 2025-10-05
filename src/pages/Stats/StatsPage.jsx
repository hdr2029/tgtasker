import { useState, useEffect } from "react";
import "./StatsPage.css";
import StatsHeader from "./components/StatsHeader";
import StatsEmptyState from "./components/StatsEmptyState";

const TOAST_HIDE_DELAY = 3000;

const triggerExportHaptic = () => {
  const haptic = window?.Telegram?.WebApp?.HapticFeedback;

  if (!haptic) {
    return;
  }

  if (typeof haptic.impactOccurred === "function") {
    haptic.impactOccurred("rigid");
  }

  if (typeof haptic.notificationOccurred === "function") {
    haptic.notificationOccurred("warning");
  }
};

const StatsPage = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!isToastVisible) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsToastVisible(false);
    }, TOAST_HIDE_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [isToastVisible]);

  const handleExportClick = () => {
    triggerExportHaptic();
    setIsToastVisible(true);
  };

  return (
    <main className="stats-page" aria-labelledby="stats-title">
      <div className="stats-page__inner">
        <StatsHeader />
        <StatsEmptyState />

        <div
          className={`stats-page__toast ${isToastVisible ? "stats-page__toast--visible" : ""}`}
          role="alert"
          aria-live="assertive"
        >
          <span className="stats-page__toast-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3a2 2 0 0 0-1.77 1.02L3.3 18.14A2 2 0 0 0 5.05 21h13.9a2 2 0 0 0 1.75-2.86L13.77 4.02A2 2 0 0 0 12 3Z"
                fill="#ffffff"
                opacity="0.9"
              />
              <path d="M12 8a1 1 0 0 1 1 1v4.5a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z" fill="#6b7280" />
              <circle cx="12" cy="17" r="1" fill="#6b7280" />
            </svg>
          </span>
          <span className="stats-page__toast-text">
            ????? ???????? ???? ?????????. ????? ? ? ??????.
          </span>
        </div>

        <button type="button" className="stats-page__export" onClick={handleExportClick}>
          ???????? ??? ????????
        </button>
      </div>
    </main>
  );
};

export default StatsPage;
