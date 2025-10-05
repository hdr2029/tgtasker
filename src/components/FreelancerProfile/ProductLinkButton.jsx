const ProductLinkButton = ({ iconClassName, icon, label, onClick, disabled = false, badge }) => {
  const handleClick = () => {
    if (!disabled && typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`product-links__button${disabled ? " product-links__button--disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={`product-links__icon ${iconClassName}`} aria-hidden="true">
        {icon}
      </span>
      <span className="product-links__info">
        <span className="product-links__label">{label}</span>
        {badge ? (
          <span className={`product-links__badge${disabled ? " product-links__badge--soon" : ""}`}>{badge}</span>
        ) : null}
      </span>
      <span className="product-links__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="product-links__arrow-svg">
          <path
            d="M8.47 4.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L13.94 12 8.47 6.53a.75.75 0 0 1 0-1.06Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
};

export default ProductLinkButton;
