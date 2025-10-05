const PayoutsBreakdown = ({ title, currencies }) => {
  return (
    <section className="payouts-breakdown" aria-labelledby="payouts-breakdown-title">
      <h1 id="payouts-breakdown-title" className="payouts-breakdown__title">
        {title}
      </h1>
      <div className="payouts-breakdown__list">
        {currencies.map((currency) => (
          <div key={currency.code} className="payouts-breakdown__row">
            <span className="payouts-breakdown__currency">{currency.code}</span>
            <span className="payouts-breakdown__amount">{currency.amount}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PayoutsBreakdown;
