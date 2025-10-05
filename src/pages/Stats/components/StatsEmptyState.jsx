const StatsEmptyState = () => {
  return (
    <section className="stats-empty" aria-label="Порожній стан статистики">
      <h2 className="stats-empty__title">Даних поки немає</h2>
      <p className="stats-empty__text">
        Статистика з'явиться одразу, щойно будуть перші транзакції та виплати.
      </p>
    </section>
  );
};

export default StatsEmptyState;
