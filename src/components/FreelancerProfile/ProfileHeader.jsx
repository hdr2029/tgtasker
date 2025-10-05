import { useAppState } from "../../context/AppStateContext";

const tonIconSrc = "https://files.svgcdn.io/token-branded/ton.png";

const formatBalance = (value) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

const ProfileHeader = ({ onReferralClick = () => {} }) => {
  const { balanceTon } = useAppState();
  const formattedBalance = formatBalance(balanceTon);

  return (
    <article className="balance-card" aria-label="Баланс фрилансера">
      <div className="balance-card__top">
        <div className="balance-card__earnings">
          <span className="balance-card__label">Ваш баланс</span>
          <span className="balance-card__value">
            <img
              className="balance-card__value-icon"
              src={tonIconSrc}
              alt="TON"
              loading="lazy"
            />
            {formattedBalance}
          </span>
        </div>
        <button
          type="button"
          className="balance-card__badge"
          aria-label="Відкрити реферальну програму"
          onClick={onReferralClick}
        >
          <span className="balance-card__badge-icon" aria-hidden="true">🔥</span>
          <span className="balance-card__badge-text">Реферали</span>
        </button>
      </div>
      <div className="balance-card__promo">
        <span className="balance-card__promo-text">Комісія 0% на перші 20 TON</span>
      </div>
    </article>
  );
};

export default ProfileHeader;
