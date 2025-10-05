import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/AppStateContext";
import "./PayoutsPage.css";
import PayoutsBreakdown from "./components/PayoutsBreakdown";
import PayoutsAutoSettings from "./components/PayoutsAutoSettings";
import PayoutsEmptyState from "./components/PayoutsEmptyState";

const formatBalance = (value) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

const PayoutsPage = () => {
  const navigate = useNavigate();
  const { balanceTon } = useAppState();

  const handleDestinationClick = () => {
    navigate("/payouts/destination");
  };

  return (
    <main className="payouts-page" aria-labelledby="payouts-title">
      <div className="payouts-page__inner">
        <PayoutsBreakdown
          title="Доступно до виплат"
          currencies={[
            { code: "TON", amount: formatBalance(balanceTon) },
          ]}
        />
        <PayoutsAutoSettings onDestinationClick={handleDestinationClick} />
        <PayoutsEmptyState />
      </div>
    </main>
  );
};

export default PayoutsPage;
