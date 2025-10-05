const QuickActionButton = ({ icon, label, onClick = () => {}, disabled = false, badge }) => {
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick();
  };

  return (
    <button
      type="button"
      className={`quick-actions__button${disabled ? " quick-actions__button--disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="quick-actions__icon" aria-hidden="true">
        {icon}
        {badge ? <span className="quick-actions__badge">{badge}</span> : null}
      </span>
      <span className="quick-actions__label">{label}</span>
    </button>
  );
};

export default QuickActionButton;
