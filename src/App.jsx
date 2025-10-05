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

const App = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const webApp = window.Telegram?.WebApp;

    if (!webApp) {
      return;
    }

    webApp.ready();

    if (typeof webApp.expand === "function") {
      webApp.expand();
    }

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

    requestFullscreen();

    const handleFullscreenChange = () => {
      console.log("isFullscreen:", webApp.isFullscreen);
    };

    if (typeof webApp.onEvent === "function") {
      webApp.onEvent("fullscreenChanged", handleFullscreenChange);
    }

    return () => {
      if (typeof webApp.offEvent === "function") {
        webApp.offEvent("fullscreenChanged", handleFullscreenChange);
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
