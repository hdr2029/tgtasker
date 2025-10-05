import "./FaqPage.css";

const FaqPage = () => {
  return (
    <main className="faq-page" aria-labelledby="faq-title">
      <div className="faq-page__inner">
        <header className="faq-page__header">
          <h1 id="faq-title" className="faq-page__title">
            Про сервіс TonTaske
          </h1>
          <div className="faq-page__hero" aria-hidden="true">
            <img
              className="faq-page__hero-icon"
              src="https://storage.googleapis.com/ton-strapi/Image_a1f703cfe3/Image_a1f703cfe3.png?updated_at=2023-07-16T13:45:22.783Z"
              alt="Логотип TonTaske"
              loading="lazy"
            />
          </div>
        </header>

        <section className="faq-page__content" aria-label="FAQ про TonTaske">
          <p className="faq-page__paragraph">
            <strong>TonTaske</strong> — сервіс для керування завданнями та рекламними кампаніями в екосистемі TON.
            Платформа допомагає створювати промоакції, відстежувати їх ефективність та автоматично винагороджувати
            виконавців.
          </p>
          <p className="faq-page__paragraph">
            Усі операції проходять через смартконтракти, що гарантує безпеку й прозорість платежів. Ви можете об'єднати
            роботу команди, отримувати звіти та надсилати виплати без зайвої ручної роботи.
          </p>
        </section>

        <section className="faq-page__card" aria-label="Корисні посилання">
          <h2 className="faq-page__card-title">Корисні матеріали</h2>
          <p className="faq-page__card-text">
            Новини та оновлення сервісу: {" "}
            <a className="faq-page__link" href="https://t.me/tontaske" target="_blank" rel="noreferrer">
              https://t.me/tontaske
            </a>
          </p>
          <p className="faq-page__card-text">
            Зв'язок з командою: {" "}
            <a className="faq-page__link" href="mailto:tontaske@proton.me">
              tontaske@proton.me
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default FaqPage;
