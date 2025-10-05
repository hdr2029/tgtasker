const StatsHeader = () => {
  return (
    <header className="stats-header" aria-describedby="stats-description">
      <img
        className="stats-header__icon"
        src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/32_1-512.png?v=2"
        alt="Іконка статистики"
        loading="lazy"
      />
      <h1 id="stats-title" className="stats-header__title">
        Статистика
      </h1>
      <p id="stats-description" className="stats-header__subtitle">
        Дані оновлюються кожні 15 хвилин та відображаються за часовим поясом UTC.
      </p>
    </header>
  );
};

export default StatsHeader;
