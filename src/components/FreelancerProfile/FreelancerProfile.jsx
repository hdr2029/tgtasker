import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerProfile.css";
import ProfileHeader from "./ProfileHeader";
import QuickActions from "./QuickActions";
import PayoutSetupCard from "./PayoutSetupCard";
import ProductLinks from "./ProductLinks";

const quickActionConfigs = [
  {
    id: "payouts",
    label: "Виплати",
    icon: (
      <svg
        className="quick-actions__icon-svg"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="12"
          width="32"
          height="24"
          rx="8"
          fill="currentColor"
          opacity="0.14"
        />
        <rect x="8" y="16" width="32" height="16" rx="5" fill="currentColor" />
        <rect x="16" y="22" width="8" height="6" rx="2" fill="white" />
        <rect
          x="26"
          y="22"
          width="12"
          height="4"
          rx="2"
          fill="white"
          opacity="0.6"
        />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Аналітика",
    icon: (
      <svg
        className="quick-actions__icon-svg"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="24"
          width="8"
          height="12"
          rx="3"
          fill="currentColor"
          opacity="0.35"
        />
        <rect
          x="20"
          y="18"
          width="8"
          height="18"
          rx="3"
          fill="currentColor"
          opacity="0.65"
        />
        <rect x="30" y="14" width="8" height="22" rx="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "more",
    label: "Ще сервіси",
    icon: (
      <svg
        className="quick-actions__icon-svg"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 8a2 2 0 0 1 1.82 1.14l2.1 4.8 5.19.6a2 2 0 0 1 1.06 3.45l-3.84 3.46 1 5.11a2 2 0 0 1-2.94 2.12L24 25.9l-4.29 2.78a2 2 0 0 1-2.94-2.12l1-5.11-3.84-3.46a2 2 0 0 1 1.06-3.45l5.19-.6 2.1-4.8A2 2 0 0 1 24 8Z"
          fill="currentColor"
        />
      </svg>
    ),
    disabled: true,
    badge: "Незабаром",
  },
];

const productLinks = {
  primary: {
    id: "channels",
    label: "Канали та соцмережі",
    iconClassName: "product-links__icon--channels",
    icon: (
      <svg
        className="product-links__icon-svg"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 10H14a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h2v5.4a1 1 0 0 0 1.64.77L24 30h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6Z"
          fill="#ffffff"
          opacity="0.95"
        />
        <path
          d="M34 16h-1.5v4.5c0 4.142-3.358 7.5-7.5 7.5H23l3.6 2.88a1 1 0 0 1-.63 1.78H25v1.34a1 1 0 0 0 1 1h8a6 6 0 0 0 6-6V22a6 6 0 0 0-6-6Z"
          fill="rgba(255,255,255,0.7)"
        />
      </svg>
    ),
  },
  stack: [
    {
      id: "faq",
      label: "FAQ",
      iconClassName: "product-links__icon--faq",
      icon: (
        <svg
          className="product-links__icon-svg"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 8.5a2 2 0 0 1 1.78 1.09l3.34 6.68 7.37 1.07a2 2 0 0 1 1.11 3.4l-5.33 5.2 1.26 7.36a2 2 0 0 1-2.9 2.11L24 31.84l-6.63 3.47a2 2 0 0 1-2.9-2.11л1.26-7.36-5.33-5.2a2 2 0 0 1 1.11-3.4л7.37-1.07 3.34-6.68A2 2 0 0 1 24 8.5Z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      id: "ads",
      label: "Реклама",
      iconClassName: "product-links__icon--ads",
      icon: (
        <svg
          className="product-links__icon-svg"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 16a4 4 0 0 1 4-4h8a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8h-8a4 4 0 0 1-4-4Z"
            fill="#ffffff"
            opacity="0.9"
          />
          <path
            d="M18 12a2 2 0 0 0-2 2v20a2 2 0 0 0 4 0v-4h6l5.2 3.12a1 1 0 0 0 1.52-0.85V15.73a1 1 0 0 0-1.52-0.85L26 18h-6v-4a2 2 0 0 0-2-2Z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      id: "promo",
      label: "Промокоди",
      iconClassName: "product-links__icon--promo",
      icon: (
        <svg
          className="product-links__icon-svg"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="12"
            y="12"
            width="24"
            height="24"
            rx="8"
            fill="#ffffff"
            opacity="0.9"
          />
          <path
            d="M18 24a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm12 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
            fill="#d946ef"
          />
          <path
            d="M20 28 28 20"
            stroke="#d946ef"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      disabled: true,
      badge: "Незабаром",
    },
    {
      id: "raffle",
      label: "Розіграші",
      iconClassName: "product-links__icon--raffle",
      icon: (
        <svg
          className="product-links__icon-svg"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4Z"
            fill="#ffffff"
            opacity="0.9"
          />
          <path
            d="M18 20h12l-2.4 4.8a2 2 0 0 1-1.8 1.2h-3.6a2 2 0 0 1-1.8-1.2Z"
            fill="#0ea5e9"
          />
        </svg>
      ),
      disabled: true,
      badge: "Незабаром",
    },
  ],
};

const FreelancerProfile = () => {
  const navigate = useNavigate();

  const handleReferralClick = () => {
    navigate("/referral");
  };

  const handlePayoutSetupClick = () => {
    navigate("/payouts/verification");
  };

  const primaryProductLink = useMemo(
    () => ({
      ...productLinks.primary,
      onClick: () => navigate("/channels"),
    }),
    [navigate]
  );

  const stackProductLinks = useMemo(
    () =>
      productLinks.stack.map((link) => {
        if (link.id === "faq") {
          return {
            ...link,
            onClick: () => navigate("/faq"),
          };
        }

        if (link.id === "ads") {
          return {
            ...link,
            onClick: () => navigate("/ads"),
          };
        }

        return link;
      }),
    [navigate]
  );

  const quickActions = useMemo(
    () =>
      quickActionConfigs.map((action) => {
        if (action.id === "payouts") {
          return {
            ...action,
            onClick: () => navigate("/payouts"),
          };
        }

        if (action.id === "analytics") {
          return {
            ...action,
            onClick: () => navigate("/stats"),
          };
        }

        return action;
      }),
    [navigate]
  );

  return (
    <section
      className="profile-section"
      aria-labelledby="freelancer-profile-title"
    >
      <div className="profile-section__inner">
        <h1 id="freelancer-profile-title" className="profile-section__title">
          Профіль фрілансера
        </h1>
        <ProfileHeader onReferralClick={handleReferralClick} />
        <QuickActions actions={quickActions} />
        <PayoutSetupCard onClick={handlePayoutSetupClick} />
        <ProductLinks
          primaryLink={primaryProductLink}
          stackLinks={stackProductLinks}
        />
      </div>
    </section>
  );
};

export default FreelancerProfile;
