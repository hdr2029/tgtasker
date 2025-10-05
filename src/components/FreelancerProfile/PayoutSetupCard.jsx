const PayoutSetupCard = ({ onClick }) => {
  const handleClick = onClick ?? (() => {});

  return (
    <button
      type="button"
      onClick={handleClick}
      className="payout-setup"
      aria-label="Налаштувати виплати"
    >
      <span className="payout-setup__icon" aria-hidden="true">
        <img
          className="payout-setup__icon-img"
          src="https://img.icons8.com/?size=100&id=12116&format=png&color=000000"
          alt=""
          loading="lazy"
        />
      </span>
      <span className="payout-setup__content">
        <span className="payout-setup__title">Налаштуйте виплати</span>
        <span className="payout-setup__description">
          Оберіть зручний гаманець і активуйте автоматичні виплати своїх доходів.
        </span>
      </span>
      <span className="payout-setup__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="payout-setup__arrow-svg">
          <path
            d="M8.47 4.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L13.94 12 8.47 6.53a.75.75 0 0 1 0-1.06Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
};

export default PayoutSetupCard;
