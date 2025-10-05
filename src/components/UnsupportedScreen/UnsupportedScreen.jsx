import "./UnsupportedScreen.css";

const UnsupportedScreen = () => {
  return (
    <main className="unsupported-screen" aria-labelledby="unsupported-title">
      <div className="unsupported-screen__card">
        <h1 id="unsupported-title" className="unsupported-screen__title">
          Доступ лише з мобільного пристрою
        </h1>
        <p className="unsupported-screen__text">
          Відкрийте TonTaske у мобільному додатку або в мобільному браузері. Версії для ПК та веб Telegram наразі не підтримуються.
        </p>
      </div>
    </main>
  );
};

export default UnsupportedScreen;
