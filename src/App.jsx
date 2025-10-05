import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FreelancerProfile from "./components/FreelancerProfile/FreelancerProfile";
import ReferralProgramPage from "./pages/ReferralProgram/ReferralProgramPage";
import PayoutsPage from "./pages/Payouts/PayoutsPage";
import PayoutDestinationPage from "./pages/PayoutDestination/PayoutDestinationPage";
import StatsPage from "./pages/Stats/StatsPage";
import FaqPage from "./pages/Faq/FaqPage";
import ChannelsPage from "./pages/Channels/ChannelsPage";
import AdsPage from "./pages/Ads/AdsPage";
import PayoutVerificationPage from "./pages/PayoutVerification/PayoutVerificationPage";

const TELEGRAM_TOP_CONTROLS_OFFSET_PX = 72;

const App = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const root = document.documentElement;

    let cleanup = () => {};
    let intervalId = null;

    const initialiseWebApp = (webApp) => {
      if (!webApp) {
        return false;
      }

      webApp.ready();

      if (typeof webApp.expand === "function") {
        webApp.expand();
      }

      const applySafeAreaTop = () => {
        const safeAreaTop = typeof webApp.safeArea?.top === "number" ? webApp.safeArea.top : 0;
        const offset = Math.max(safeAreaTop, 0) + TELEGRAM_TOP_CONTROLS_OFFSET_PX;

        root.style.setProperty("--tg-safe-area-top", `${offset}px`);
      };

      const requestFullscreen = async () => {
        if (typeof webApp.requestFullscreen !== "function") {
          return;
        }

        try {
          await webApp.requestFullscreen();
        } catch (error) {
          console.error("Не удалось перейти в полноэкранный режим:", error);
        }
      };

      const handleFullscreenChange = () => {
        console.log("isFullscreen:", webApp.isFullscreen);
      };

      const handleViewportChange = () => {
        applySafeAreaTop();
      };

      applySafeAreaTop();
      requestFullscreen();

      if (typeof webApp.onEvent === "function") {
        webApp.onEvent("fullscreenChanged", handleFullscreenChange);
        webApp.onEvent("viewportChanged", handleViewportChange);
      }

      cleanup = () => {
        if (typeof webApp.offEvent === "function") {
          webApp.offEvent("fullscreenChanged", handleFullscreenChange);
          webApp.offEvent("viewportChanged", handleViewportChange);
        }

        root.style.setProperty("--tg-safe-area-top", "0px");
      };

      return true;
    };

    const tryInitialise = () => initialiseWebApp(window.Telegram?.WebApp);

    if (!tryInitialise()) {
      intervalId = window.setInterval(() => {
        if (tryInitialise()) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      }, 200);
    }

    return () => {
      cleanup();

      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<FreelancerProfile />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/referral" element={<ReferralProgramPage />} />
        <Route path="/payouts" element={<PayoutsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/payouts/verification" element={<PayoutVerificationPage />} />
        <Route path="/payouts/destination" element={<PayoutDestinationPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
