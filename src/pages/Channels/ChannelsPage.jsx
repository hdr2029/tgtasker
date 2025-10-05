import "./ChannelsPage.css";
import { useCallback, useMemo } from "react";
import { useAppState } from "../../context/AppStateContext";

const tonIconSrc = "https://files.svgcdn.io/token-branded/ton.png";

const triggerChannelHaptic = () => {
  const haptic = window?.Telegram?.WebApp?.HapticFeedback;

  if (!haptic) {
    return;
  }

  if (typeof haptic.impactOccurred === "function") {
    haptic.impactOccurred("soft");
  }

  if (typeof haptic.notificationOccurred === "function") {
    haptic.notificationOccurred("success");
  }
};

const formatReward = (value) => {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  const fixed = value.toFixed(3);
  return fixed.replace(/\.0+$/, "").replace(/0+$/, "");
};

const ChannelsPage = () => {
  const { channels, completeChannel } = useAppState();

  const visibleChannels = useMemo(
    () => channels.filter((channel) => channel.status !== "archived"),
    [channels]
  );

  const handleChannelClick = useCallback(
    (event, channel) => {
      if (channel.status !== "available") {
        event.preventDefault();
        return;
      }

      completeChannel(channel.id);
      triggerChannelHaptic();
    },
    [completeChannel]
  );

  return (
    <main className="channels-page" aria-labelledby="channels-title">
      <div className="channels-page__inner">
        <header className="channels-header">
          <h1 id="channels-title" className="channels-header__title">
            Публічні канали
          </h1>
          <p className="channels-header__subtitle">
            Оберіть завдання, щоб отримати винагороду у TON
          </p>
        </header>

        {visibleChannels.length === 0 ? (
          <div className="channels-empty" role="status">
            <p className="channels-empty__title">
              Нові завдання з'являться незабаром!
            </p>
            <p className="channels-empty__hint">
              Верифікуйте обліковий запис, щоб отримати більше завдань
            </p>
          </div>
        ) : (
          <ul className="channels-list" aria-label="Список доступних каналів">
            {visibleChannels.map((channel) => {
              const { id, name, audience, avatar, rewardTon, link, status } =
                channel;
              const isCompleted = status === "completed";
              const rewardLabel = formatReward(rewardTon);

              return (
                <li key={id} className="channels-list__item">
                  <a
                    className={`channels-item${
                      isCompleted ? " channels-item--completed" : ""
                    }`}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => handleChannelClick(event, channel)}
                  >
                    <span className="channels-item__avatar" aria-hidden="true">
                      <img src={avatar} alt="" loading="lazy" />
                    </span>
                    <span className="channels-item__content">
                      <span className="channels-item__name">{name}</span>
                      <span className="channels-item__meta">
                        <svg
                          className="channels-item__meta-icon"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.33 0-6 1.55-6 3.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5c0-1.95-2.67-3.5-6-3.5Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="channels-item__audience">
                          {audience}
                        </span>
                      </span>
                    </span>
                    <span
                      className={`channels-item__reward${
                        isCompleted ? " channels-item__reward--completed" : ""
                      }`}
                      aria-label={
                        isCompleted
                          ? `Винагороду ${rewardLabel} TON вже нараховано`
                          : `Винагорода ${rewardLabel} TON`
                      }
                    >
                      {isCompleted ? (
                        <>
                          <svg
                            className="channels-item__reward-check"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M9.17 16.17 4.7 11.7a1 1 0 0 1 1.4-1.4l3.07 3.06 8.72-8.72a1 1 0 0 1 1.42 1.42l-9.43 9.41a1 1 0 0 1-1.41 0Z"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="channels-item__reward-text">
                            Виконано
                          </span>
                        </>
                      ) : (
                        <>
                          <img
                            className="channels-item__reward-icon"
                            src={tonIconSrc}
                            alt="TON"
                            loading="lazy"
                          />
                          <span className="channels-item__reward-value">
                            {rewardLabel}
                          </span>
                        </>
                      )}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
};

export default ChannelsPage;
