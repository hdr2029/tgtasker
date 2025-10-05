import "./PayoutDestinationPage.css";
import PayoutDestinationForm from "./components/PayoutDestinationForm";

const PayoutDestinationPage = () => {
  return (
    <main className="payout-destination" aria-labelledby="destination-title">
      <div className="payout-destination__inner">
        <header className="payout-destination__header">
          <h1 id="destination-title" className="payout-destination__title">
            Вкажіть напрямок виплат
          </h1>
          <p className="payout-destination__subtitle">
            Оберіть гаманець, на який будуть надходити автоматичні виплати.
          </p>
        </header>
        <PayoutDestinationForm />
      </div>
    </main>
  );
};

export default PayoutDestinationPage;
