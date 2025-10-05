import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import SplashScreen from "./components/SplashScreen/SplashScreen";
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
const TELEGRAM_BACKGROUND_COLOR = "#eaf3ff";
const REDIRECT_STORAGE_KEY = "wella:redirect-path";

const useTelegramNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    try {
      sessionStorage.setItem(
        "wella:last-path",
        `${location.pathname}${location.search}${location.hash}`
      );
    } catch (storageError) {
      console.warn("Failed to persist last path", storageError);
    }

    const webApp = window.Telegram?.WebApp;

    if (!webApp) {
      return undefined;
    }

    const isRoot = location.pathname === "/";

    if (isRoot) {
      webApp.BackButton.hide();
      if (typeof webApp.setHeaderColor === "function") {
        webApp.setHeaderColor(TELEGRAM_BACKGROUND_COLOR);
      }

      return undefined;
    }

    if (typeof webApp.BackButton.show === "function") {
      webApp.BackButton.show();
    }

    const triggerBackHaptic = () => {
      const haptic = webApp.HapticFeedback;

      if (!haptic) {
        return;
      }

      if (typeof haptic.impactOccurred === "function") {
        haptic.impactOccurred("soft");
      }

      if (typeof haptic.notificationOccurred === "function") {
        haptic.notificationOccurred("success");
      }
    };

    const handleBackClick = () => {
      triggerBackHaptic();
      navigate(-1);
    };

    webApp.BackButton.onClick(handleBackClick);

    return () => {
      webApp.BackButton.offClick(handleBackClick);
      webApp.BackButton.hide();
    };
  }, [location.pathname, location.search, location.hash, navigate]);
};

const TelegramAwareApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    try {
      const pendingRedirect = sessionStorage.getItem(REDIRECT_STORAGE_KEY);
      if (pendingRedirect) {
        sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
        const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (pendingRedirect && pendingRedirect !== currentPath) {
          navigate(pendingRedirect, { replace: true });
        }
      }
    } catch (error) {
      console.warn("Failed to restore path from redirect", error);
    }

    return undefined;
  }, [navigate]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const root = document.documentElement;
    const htmlStyle = root.style;
    const bodyStyle = document.body.style;

    const restoreOverscroll = {
      html: htmlStyle.overscrollBehaviorY,
      body: bodyStyle.overscrollBehaviorY,
    };

    htmlStyle.overscrollBehaviorY = "contain";
    bodyStyle.overscrollBehaviorY = "contain";

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

      if (typeof webApp.setBackgroundColor === "function") {
        webApp.setBackgroundColor(TELEGRAM_BACKGROUND_COLOR);
      }

      if (typeof webApp.disableVerticalSwipes === "function") {
        webApp.disableVerticalSwipes();
      }

      const applySafeArea = () => {
        const safeAreaTop = Number.isFinite(webApp.safeArea?.top) ? Math.max(webApp.safeArea.top, 0) : 0;
        const safeAreaBottom = Number.isFinite(webApp.safeArea?.bottom)
          ? Math.max(webApp.safeArea.bottom, 0)
          : 0;

        root.style.setProperty("--tg-safe-area-top", `${safeAreaTop + TELEGRAM_TOP_CONTROLS_OFFSET_PX}px`);
        root.style.setProperty("--tg-safe-area-bottom", `${safeAreaBottom}px`);
      };

      const requestFullscreen = async () => {
        if (typeof webApp.requestFullscreen !== "function") {
          return;
        }

        try {
          await webApp.requestFullscreen();
        } catch (error) {
          console.error("Не вдалося перейти у повноекранний режим:", error);
        }
      };

      const handleFullscreenChange = () => {
        console.log("isFullscreen:", webApp.isFullscreen);
      };

      const handleViewportChange = () => {
        applySafeArea();
      };

      applySafeArea();
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

        if (typeof webApp.enableVerticalSwipes === "function") {
          webApp.enableVerticalSwipes();
        }

        root.style.setProperty("--tg-safe-area-top", "0px");
        root.style.setProperty("--tg-safe-area-bottom", "0px");
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

      htmlStyle.overscrollBehaviorY = restoreOverscroll.html || "";
      bodyStyle.overscrollBehaviorY = restoreOverscroll.body || "";
    };
  }, []);

  useTelegramNavigation();

  return (
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
  );
};

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [shouldRenderSplash, setShouldRenderSplash] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const hideTimeout = window.setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    const removeTimeout = window.setTimeout(() => {
      setShouldRenderSplash(false);
    }, 2400);

    return () => {
      window.clearTimeout(hideTimeout);
      window.clearTimeout(removeTimeout);
    };
  }, []);

  const shellClassName = isSplashVisible ? "app-shell app-shell--hidden" : "app-shell";

  return (
    <>
      {shouldRenderSplash ? <SplashScreen isFadingOut={!isSplashVisible} /> : null}
      <div className={shellClassName}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <TelegramAwareApp />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
