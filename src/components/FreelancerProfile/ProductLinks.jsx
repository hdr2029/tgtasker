import ProductLinkButton from "./ProductLinkButton";

const ProductLinks = ({ primaryLink, stackLinks }) => {
  if (!primaryLink && (!stackLinks || stackLinks.length === 0)) {
    return null;
  }

  return (
    <nav className="product-links" aria-label="Додаткові розділи">
      {primaryLink ? (
        <div className="product-links__card">
          <ProductLinkButton {...primaryLink} />
        </div>
      ) : null}
      {stackLinks?.length ? (
        <div className="product-links__card product-links__card--stack">
          {stackLinks.map((link) => (
            <ProductLinkButton key={link.id} {...link} />
          ))}
        </div>
      ) : null}
    </nav>
  );
};

export default ProductLinks;
