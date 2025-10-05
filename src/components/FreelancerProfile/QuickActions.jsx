import QuickActionButton from "./QuickActionButton";

const QuickActions = ({ actions }) => {
  if (!actions?.length) {
    return null;
  }

  return (
    <nav className="quick-actions" aria-label="Швидкі дії">
      {actions.map((action) => (
        <QuickActionButton
          key={action.id}
          icon={action.icon}
          label={action.label}
          onClick={action.onClick}
          disabled={action.disabled}
          badge={action.badge}
        />
      ))}
    </nav>
  );
};

export default QuickActions;
