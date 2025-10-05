import { useEffect, useState } from "react";
import "./AdsPage.css";

const TOAST_HIDE_DELAY = 3000;

const AdsPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!isToastVisible) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setIsToastVisible(false);
    }, TOAST_HIDE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [isToastVisible]);

  const handleEnableClick = () => {
    setIsToastVisible(true);
  };

  return (
    <main className="ads-page" aria-labelledby="ads-title">
      <div className="ads-page__inner">
        <header className="ads-page__header">
          <div className="ads-page__hero" aria-hidden="true">
            <img
              className="ads-page__hero-icon"
              src="https://cdn-icons-png.flaticon.com/512/5875/5875289.png"
              alt="Рекламний мегафон"
              loading="lazy"
            />
          </div>
          <h1 id="ads-title" className="ads-page__title">
            Ваша реклама
          </h1>
          <p className="ads-page__subtitle">
            Приводьте нових клієнтів і заробляйте на їхніх покупках завдяки автоматичному розміщенню.
          </p>
        </header>

        <section className="ads-features" aria-label="Переваги тарифу">
          <article className="ads-feature">
            <span className="ads-feature__icon" aria-hidden="true">📅</span>
            <div className="ads-feature__content">
              <h2 className="ads-feature__title">Постійне розміщення</h2>
              <p className="ads-feature__text">
                Ми можемо показувати вашу рекламу впродовж усього року без обмежень за часом.
              </p>
            </div>
          </article>
          <article className="ads-feature">
            <span className="ads-feature__icon" aria-hidden="true">📈</span>
            <div className="ads-feature__content">
              <h2 className="ads-feature__title">Висока залученість</h2>
              <p className="ads-feature__text">
                Наші користувачі активно взаємодіють з рекламними пропозиціями, що збільшує ваш дохід.
              </p>
            </div>
          </article>
          <article className="ads-feature">
            <span className="ads-feature__icon" aria-hidden="true">✅</span>
            <div className="ads-feature__content">
              <h2 className="ads-feature__title">Перевірені клієнти</h2>
              <p className="ads-feature__text">
                Рекламу бачать реальні люди, які можуть бути зацікавлені у ваших товарах та послугах.
              </p>
            </div>
          </article>
        </section>

        <label className="ads-consent" htmlFor="ads-consent-checkbox">
          <input
            id="ads-consent-checkbox"
            className="ads-consent__checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
          />
          <span className="ads-consent__text">
            Я приймаю <span className="ads-consent__link">оферту</span> та умови використання
          </span>
        </label>

        <div
          className={`ads-toast ${isToastVisible ? "ads-toast--visible" : ""}`}
          role="alert"
          aria-live="assertive"
        >
          <span className="ads-toast__icon" aria-hidden="true">
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
          <span className="ads-toast__text">
            Обліковий запис ще не верифіковано. Підтвердіть виплати, щоб увімкнути рекламу.
          </span>
        </div>

        <button type="button" className="ads-page__cta" onClick={handleEnableClick}>
          Увімкнути
        </button>
      </div>
    </main>
  );
};

export default AdsPage;
