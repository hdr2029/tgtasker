import { useNavigate } from "react-router-dom";
import "./ReferralProgramPage.css";

const ReferralProgramPage = () => {
  const navigate = useNavigate();

  const handleVerificationClick = () => {
    navigate("/payouts/verification");
  };

  return (
    <main className="referral-page" aria-labelledby="referral-title">
      <div className="referral-page__inner">
        <img
          className="referral-page__hero"
          src="https://cdn-icons-png.flaticon.com/512/10810/10810041.png"
          alt="Іконка реферальної програми"
          loading="lazy"
        />
        <h1 id="referral-title" className="referral-page__title">
          Реферальна програма
        </h1>
        <p className="referral-page__subtitle">
          Отримуйте 5% від доходу запрошених друзів.
        </p>
        <button type="button" className="referral-page__more">
          Дізнатися більше
        </button>

        <section
          className="referral-page__card referral-page__card--info"
          aria-label="Як активувати бонуси"
        >
          <span className="referral-page__card-icon" aria-hidden="true">
            i
          </span>
          <div className="referral-page__card-body">
            <span className="referral-page__card-title">
              Спочатку верифікація
            </span>
            <span className="referral-page__card-text">
              Підтвердіть виплати, щоб бонуси нараховувались автоматично та без
              додаткових перевірок.
            </span>
          </div>
          <span className="referral-page__card-arrow" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="referral-page__card-arrow-svg"
            >
              <path
                d="M8.47 4.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L13.94 12 8.47 6.53a.75.75 0 0 1 0-1.06Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </section>

        <button
          type="button"
          className="referral-page__verify"
          onClick={handleVerificationClick}
        >
          Пройти верифікацію
        </button>
        <p className="referral-page__verify-hint">
          Після підтвердження виплат реферальні посилання активуються
          автоматично, і бонуси почнуть нараховуватись.
        </p>

        <section
          className="referral-page__summary"
          aria-label="Статистика програми"
        >
          <div className="referral-page__summary-card">
            <span className="referral-page__summary-label">
              Запрошені партнери
            </span>
            <span className="referral-page__summary-value">0</span>
          </div>
          <div className="referral-page__summary-card referral-page__summary-card--compact">
            <span className="referral-page__summary-label">
              Виплачено бонусів
            </span>
            <span className="referral-page__summary-value">0</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReferralProgramPage;
