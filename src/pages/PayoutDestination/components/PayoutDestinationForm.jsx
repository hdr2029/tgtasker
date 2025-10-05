import { useEffect, useState } from "react";

const currencyOptions = [
  { value: "USDT", label: "USDT (TRC-20)" },
  { value: "TON", label: "TON" },
];

const STORAGE_KEY = "payoutDestination";

const PayoutDestinationForm = () => {
  const [currency, setCurrency] = useState(currencyOptions[0].value);
  const [addressDraft, setAddressDraft] = useState("");
  const [savedAddress, setSavedAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored);
      if (parsed?.address) {
        setSavedAddress(parsed.address);
        setAddressDraft(parsed.address);

        if (parsed.currency && currencyOptions.some((option) => option.value === parsed.currency)) {
          setCurrency(parsed.currency);
        }
      }
    } catch (storageError) {
      console.warn("Не вдалося прочитати налаштування виплат", storageError);
    }
  }, []);

  const isSaved = Boolean(savedAddress);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSaved) {
      return;
    }

    const trimmed = addressDraft.trim();
    if (!trimmed) {
      setError("Введіть адресу гаманця");
      return;
    }

    setError("");
    setSavedAddress(trimmed);
    setAddressDraft(trimmed);

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ currency, address: trimmed })
        );
      } catch (storageError) {
        console.warn("Не вдалося зберегти налаштування виплат", storageError);
      }
    }
  };

  const handleAddressChange = (event) => {
    if (isSaved) {
      return;
    }
    setAddressDraft(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    if (isSaved) {
      return;
    }
    setCurrency(event.target.value);
  };

  return (
    <form className="destination-form" onSubmit={handleSubmit}>
      <div className="destination-form__group">
        <label htmlFor="destination-currency" className="destination-form__label">
          Оберіть валюту виплат
        </label>
        <p className="destination-form__hint">
          Переконайтеся, що обраний гаманець підтримує цей тип мережі — запишіть адресу заздалегідь.
        </p>
        <select
          id="destination-currency"
          className="destination-form__select"
          value={currency}
          onChange={handleCurrencyChange}
          disabled={isSaved}
        >
          {currencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="destination-form__group">
        <label htmlFor="destination-address" className="destination-form__label">
          Адреса гаманця
        </label>
        <p className="destination-form__hint destination-form__hint--muted">
          Після збереження адресу можна буде змінити — контактуйте з підтримкою.
        </p>
        <input
          id="destination-address"
          type="text"
          className="destination-form__input"
          placeholder="Наприклад: EQD..."
          value={isSaved ? savedAddress : addressDraft}
          onChange={handleAddressChange}
          readOnly={isSaved}
        />
        {error ? <span className="destination-form__error">{error}</span> : null}
      </div>

      <div className="destination-form__actions">
        <button type="submit" className="destination-form__submit" disabled={isSaved}>
          {isSaved ? "Адресу збережено" : "Зберегти"}
        </button>
      </div>
    </form>
  );
};

export default PayoutDestinationForm;
