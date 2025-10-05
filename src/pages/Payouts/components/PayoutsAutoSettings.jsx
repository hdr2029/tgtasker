import { useState } from "react";

const PayoutsAutoSettings = ({ onDestinationClick = () => {} }) => {
  const [isAutoEnabled, setIsAutoEnabled] = useState(true);

  const toggleAuto = () => {
    setIsAutoEnabled((prev) => !prev);
  };

  return (
    <section className="payouts-auto" aria-label="Автоматичні виплати">
      <header className="payouts-auto__header">
        <div>
          <h2 className="payouts-auto__title">Автоматичні виплати</h2>
          <p className="payouts-auto__description">Куди надсилати виплати</p>
        </div>
        <button
          type="button"
          className={`payouts-auto__toggle ${
            isAutoEnabled ? "payouts-auto__toggle--on" : "payouts-auto__toggle--off"
          }`}
          role="switch"
          aria-checked={isAutoEnabled}
          onClick={toggleAuto}
        >
          <span
            className={`payouts-auto__toggle-knob ${
              isAutoEnabled ? "payouts-auto__toggle-knob--on" : "payouts-auto__toggle-knob--off"
            }`}
            aria-hidden="true"
          />
        </button>
      </header>
      <button type="button" className="payouts-auto__destination" onClick={onDestinationClick}>
        <span className="payouts-auto__destination-icon" aria-hidden="true">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5703/5703411.png"
            alt=""
            loading="lazy"
          />
        </span>
        <span className="payouts-auto__destination-text">Криптогаманець</span>
        <span className="payouts-auto__destination-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.47 4.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L13.94 12 8.47 6.53a.75.75 0 0 1 0-1.06Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
      <p className="payouts-auto__note">
        Виплати надходять двічі на місяць: після 10 і 25 числа, якщо сума більша за 35.71 TON, €4.100 або $100.
        <button type="button">Детальніше…</button>
      </p>
    </section>
  );
};

export default PayoutsAutoSettings;
