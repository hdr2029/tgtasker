const PayoutsEmptyState = () => {
  return (
    <section className="payouts-empty" aria-label="Порожній розділ виплат">
      <img
        className="payouts-empty__illustration"
        src="https://cdn-icons-png.flaticon.com/512/10813/10813791.png"
        alt="Папка з документами"
        loading="lazy"
      />
      <h2 className="payouts-empty__title">Виплати з'являться тут</h2>
      <p className="payouts-empty__text">
        У вас поки немає виплат. Як тільки надійде перше зарахування, воно з'явиться у цьому розділі.
      </p>
    </section>
  );
};

export default PayoutsEmptyState;

